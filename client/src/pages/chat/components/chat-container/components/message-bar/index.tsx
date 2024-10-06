
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { GrAttachment } from 'react-icons/gr'
import { CustomButton } from '@/ui-components/custom-button';
import { RiEmojiStickerLine } from 'react-icons/ri';
import { IoSend } from 'react-icons/io5';
import EmojiPicker, { Theme } from 'emoji-picker-react';

const MessageBar = () => {
  const emojiRef = useRef<HTMLDivElement | null>(null)
  const [message, setMessage] = useState('')
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (emojiRef.current && !emojiRef.current?.contains(event.target)) {
        setIsEmojiPickerOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [emojiRef]);

  const handleEmojiClick = (emoji: any) => {
    setMessage(message => message + emoji.emoji)
  }

  // const handleSendMessage = () => {
  //   if (message) {
  //     console.log(message)
  //   }
  // }

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

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

        <CustomButton className={styles['attach-button']}>
          <GrAttachment className={styles['attach-icon']} />
        </CustomButton>

        <div className={styles['sticker-wrapper']}>
          <CustomButton className={styles['sticker-button']} onClick={() => setIsEmojiPickerOpen(true)}>
            <RiEmojiStickerLine className={styles['sticker-icon']} />
          </CustomButton>

          <div ref={emojiRef} className={styles.emojiPicker}>
            <EmojiPicker theme={Theme.DARK}
              open={isEmojiPickerOpen}
              onEmojiClick={handleEmojiClick}
              autoFocusSearch={false}
            />
          </div>
        </div>

        <div className={styles['send-wrapper']}>
          <CustomButton className={styles['send-button']}>
            <IoSend className={styles['send-icon']} />
          </CustomButton>
        </div>

      </div>
    </div>
  )
}

export { MessageBar }
