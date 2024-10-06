import { ChatContainer } from "./components/chat-container"
import { Contacts } from "./components/contacts"
import { EmptyChat } from "./components/empty-chat"
import styles from './styles.module.scss'

const Chat = () => {
  return (
    <section className={styles.chat}>
      <Contacts />

      <EmptyChat />

      <ChatContainer />
    </section>
  )
}
export { Chat }
