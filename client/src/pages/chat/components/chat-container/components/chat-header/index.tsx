import { CustomButton } from '@/ui-components/custom-button'
import { RiCloseFill } from 'react-icons/ri'
import styles from './styles.module.scss'

const ChatHeader = () => {
  return (
    <div className={styles['chat-header']}>
      <div className={styles['wrapper']}>
        <div className={styles.header}></div>
      </div>

      <div className={styles['wrapper']}>
        <CustomButton className={styles['close-button']}>
          <RiCloseFill className={styles['close-icon']} />
        </CustomButton>
      </div>
    </div>
  )
}

export { ChatHeader }
