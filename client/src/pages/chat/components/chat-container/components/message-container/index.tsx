import { useStore } from '@/store';
import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { Typography } from '@/ui-components/typography';
import cn from 'classnames';
import toast from 'react-hot-toast';
import { apiClient } from '@/lib/api-client';
import { GET_MESSAGES_ROUTE, HOST } from '@/utils/config';
import { MdFolderZip } from 'react-icons/md'
import { IoMdArrowRoundDown } from 'react-icons/io'
import { IoCloseSharp } from 'react-icons/io5';
import { MessageInfo } from '@/types/message-info';

const MessageContainer = () => {
  const { selectedChatData, selectedChatType, selectedChatMessages, setSelectedChatMessages } = useStore();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isShowImage, setIsShowImage] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.post(
          GET_MESSAGES_ROUTE,
          { id: selectedChatData?._id },
          { withCredentials: true }
        );

        if (response.status === 200 && response.data.messages) {
          setSelectedChatMessages(response.data.messages)
        }
      } catch (error) {
        toast.error('Cannot get messages')
      }
    }

    if (selectedChatData?._id && selectedChatType === 'contact') {
      getMessages()
    }
  }, [selectedChatData?._id, selectedChatType, setSelectedChatMessages])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChatMessages])
  const renderMessages = () => {
    let lastDate: string | null = null;

    return selectedChatMessages.map((message) => {
      const messageDate = moment(message.timestamp).format('YYYY-MM-DD');
      const showDate = lastDate !== messageDate;
      lastDate = messageDate;

      return (
        <div key={message._id}>
          {showDate && (
            <div className={styles['date-separator']}>
              <Typography className={styles['date']}>
                {moment(message.timestamp).format('LL')}
              </Typography>
            </div>
          )}

          {selectedChatType === 'contact' && (
            renderDMMessages(message)
          )}
        </div>
      )
    })
  }

  const checkIfImage = (filePath: string) => {
    const regex = /\.(jpe?g|png|gif|svg|bmp|tiff|ico|jpg|tif|webp|heic|heif)$/i;

    return regex.test(filePath);
  };


  const downLoadFile = async (url: string) => {
    try {
      const response = await apiClient.get(
        HOST + '/' + url, {
        responseType: 'blob',
      });

      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');

      link.href = urlBlob;
      link.setAttribute('download', url.split('/').pop() as string);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(urlBlob);
    } catch (error) {
      toast.error('Cannot download file')
    }
  }

  const handleShowImage = (url: string) => {
    setIsShowImage(true);
    setImageUrl(url);
  }

  const handleCloseImage = () => {
    setIsShowImage(false);
    setImageUrl(null);
  }

  const renderDMMessages = (message: MessageInfo) => {
    let senderId = Object.hasOwn(message.sender, '_id')
      ? message.sender._id
      : message.sender;

    const isSender = senderId === selectedChatData?._id;

    return (
      <div className={styles['message-wrapper']}>
        {message.messageType === 'text' && (
          <div className={cn({
            [styles['message-sender-container']]: isSender,
            [styles['message-reciever-container']]: !isSender
          })}
          >
            <Typography className={cn({
              [styles['message-sender']]: !isSender,
              [styles['message-reciever']]: isSender
            })}>
              {message.content}
            </Typography>

            <div className={cn({
              [styles['timestamp-sender']]: !isSender,
              [styles['timestamp-reciever']]: isSender
            })}>
              {moment(message.timestamp).format('LT')}
            </div>
          </div>)
        }

        {
          message.messageType === 'file' && (
            (
              <div className={cn(isSender ? styles['message-sender-container'] : styles['message-reciever-container'])}>
                <div
                  className={cn(styles.message, {
                    [styles['message-sender']]: !isSender,
                    [styles['message-reciever']]: isSender
                  })}
                >
                  {checkIfImage(message.fileUrl as string)
                    ? (
                      <div
                        className={styles['image-container']}
                        onClick={() => handleShowImage(message.fileUrl as string)}
                      >
                        <img
                          src={HOST + '/' + message.fileUrl}
                          className={styles['image']}
                        />
                      </div>
                    )
                    : (<div className={styles['file-container']}>
                      <span>
                        <MdFolderZip size={50} />
                      </span>

                      <span>
                        {(message.fileUrl as string).split('/').pop()}
                      </span>

                      <span className={styles['download-button']} onClick={() => downLoadFile(message.fileUrl as string)}>
                        <IoMdArrowRoundDown size={20} />
                      </span>
                    </div>)
                  }
                </div>

                <div className={cn({
                  [styles['timestamp-sender']]: !isSender,
                  [styles['timestamp-reciever']]: isSender
                })}>
                  {moment(message.timestamp).format('LT')}
                </div>
              </div>)
          )
        }
      </div >
    )
  }

  return (
    <div className={styles['message-container']}>
      {renderMessages()}

      <div ref={scrollRef} />

      {
        (isShowImage && imageUrl) && (
          <div className={styles['image-modal']}>
            <div>
              <img src={HOST + '/' + imageUrl}
                className={styles['modal-image']}
              />
            </div>

            <div className={styles['buttons-container']}>
              <button
                onClick={() => downLoadFile(imageUrl)}
                className={styles['modal-button']}
                title='Download image'
              >
                <IoMdArrowRoundDown />
              </button>

              <button
                onClick={handleCloseImage}
                className={styles['modal-button']}
                title='Close image'
              >
                <IoCloseSharp />
              </button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export { MessageContainer }
