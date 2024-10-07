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

const MessageContainer = () => {

  const { selectedChatData, selectedChatType, userInfo, selectedChatMessages, setSelectedChatMessages } = useStore();
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
              <Typography>
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

  const renderDMMessages = (message: any) => {
    const isSender = message.sender === selectedChatData?._id;
    return (
      <div>
        {message.messageType === 'text' && (
          <div className={cn(isSender ? styles['message-sender-container'] : styles['message-reciever-container'])}>
            <div className={cn({
              [styles['message-sender']]: !isSender,
              [styles['message-reciever']]: isSender
            })}>
              {message.content}
            </div>

            <div>
              {moment(message.timestamp).format('LT')}
            </div>
          </div>)}

        {message.messageType === 'file' && (
          (
            <div className={cn(isSender ? styles['message-sender-container'] : styles['message-reciever-container'])}>
              <div
                className={cn({
                  [styles['message-sender']]: !isSender,
                  [styles['message-reciever']]: isSender
                })}
              >
                {checkIfImage(message.fileUrl)
                  ? (
                    <div
                      className={styles['image-container']}
                      onClick={() => handleShowImage(message.fileUrl)}
                    >
                      <img
                        src={HOST + '/' + message.fileUrl}
                        style={{ width: '50px', height: '50px' }}
                      />
                    </div>
                  )
                  : (<div className={styles['file-container']}>
                    <span>
                      <MdFolderZip />
                    </span>

                    <span>
                      {message.fileUrl.split('/').pop()}
                    </span>

                    <span className={styles['download-button']} onClick={() => downLoadFile(message.fileUrl)}>
                      <IoMdArrowRoundDown />
                    </span>
                  </div>)
                }
              </div>

              <div>
                {moment(message.timestamp).format('LT')}
              </div>
            </div>)
        )}
      </div>
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
                className={styles['image']}
              />
            </div>

            <div className={styles['close-button']}>
              <button onClick={() => downLoadFile(imageUrl)}>
                <IoMdArrowRoundDown />
              </button>

              <button onClick={handleCloseImage}>
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
