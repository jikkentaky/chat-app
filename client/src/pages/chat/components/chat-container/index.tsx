import { ChatHeader } from './components/chat-header'
import { MessageBar } from './components/message-bar'
import { MessageContainer } from './components/message-container'
import styles from './styles.module.scss'

const ChatContainer = () => {
  return (
    <div className={styles['chat-container']}>
      <ChatHeader />

      <MessageContainer />

      <MessageBar />
    </ div>
  )
}

export { ChatContainer }
