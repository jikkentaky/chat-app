import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { GrAttachment } from 'react-icons/gr';
import { CustomButton } from '@/ui-components/custom-button';
import { RiEmojiStickerLine } from 'react-icons/ri';
import { IoSend } from 'react-icons/io5';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { useStore } from '@/store';
import { useSocket } from '@/context/socket-context';
import toast from 'react-hot-toast';
import { apiClient } from '@/lib/api-client';
import { UPLOAD_FILES_ROUTE } from '@/utils/config';

const MessageBar = () => {
  const emojiRef = useRef<HTMLDivElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { socket } = useSocket();
  const { selectedChatData, selectedChatType, userInfo } = useStore();
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setIsEmojiPickerOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [emojiRef]);

  const handleEmojiClick = (emoji: any) => {
    setMessage((message) => message + emoji.emoji);
  };

  const handleSendMessage = () => {
    if (selectedChatType === 'contact' && socket) {
      socket.emit('sendMessage', {
        sender: userInfo?.id,
        content: message,
        recipient: selectedChatData?._id,
        messageType: 'text',
        fileUrl: null,
      });
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleAttachmentClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleAttachmentChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];

      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await apiClient.post(UPLOAD_FILES_ROUTE, formData, { withCredentials: true });

        if (response.status === 200) {
          if (selectedChatType === 'contact' && socket) {
            socket.emit('sendMessage', {
              sender: userInfo?.id,
              content: null,
              recipient: selectedChatData?._id,
              messageType: 'file',
              fileUrl: response.data.filePath,
            });
          }
        }
      }
    } catch (error) {
      toast.error('Cannot send attachment')
    }
  };

  return (
    <div className={styles['message-bar']}>
      <div className={styles['wrapper']}>
        <input
          value={message}
          onChange={handleMessageChange}
          name="message"
          className={styles['input']}
          placeholder="Type a message..."
        />

        <CustomButton className={styles['attach-button']} onClick={handleAttachmentClick}>
          <GrAttachment className={styles['attach-icon']} />

          <input
            type='file'
            ref={fileRef}
            className={styles['file-input']}
            accept='
          image/*' onChange={handleAttachmentChange}
          />
        </CustomButton>

        <div className={styles['sticker-wrapper']}>
          <CustomButton className={styles['sticker-button']} onClick={() => setIsEmojiPickerOpen(true)}>
            <RiEmojiStickerLine className={styles['sticker-icon']} />
          </CustomButton>

          {isEmojiPickerOpen && (
            <div ref={emojiRef} className={styles.emojiPicker}>
              <EmojiPicker
                theme={Theme.DARK}
                onEmojiClick={handleEmojiClick}
                autoFocusSearch={false}
              />
            </div>
          )}
        </div>

        <div className={styles['send-wrapper']}>
          <CustomButton className={styles['send-button']} onClick={handleSendMessage}>
            <IoSend className={styles['send-icon']} />
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export { MessageBar };
