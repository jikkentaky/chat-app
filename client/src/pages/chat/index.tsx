import { useStore } from "@/store"
import { ChatContainer } from "./components/chat-container"
import { Contacts } from "./components/contacts"
import { EmptyChat } from "./components/empty-chat"
import styles from './styles.module.scss'

const Chat = () => {
  const { selectedChatType } = useStore()

  return (
    <section className={styles.chat}>
      <Contacts />

      {
        !selectedChatType
          ? <EmptyChat />
          : <ChatContainer />
      }

    </section>
  )
}
export { Chat }
