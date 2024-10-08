import { useStore } from "@/store"
import { ChatContainer } from "./components/chat-container"
import { Contacts } from "./components/contacts"
import { EmptyChat } from "./components/empty-chat"
import styles from './styles.module.scss'

const Chat = () => {
  const { selectedChatType } = useStore()

  return (
    <div className={styles.chat}>
      <Contacts />

      {
        !selectedChatType
          ? <EmptyChat />
          : <ChatContainer />
      }
    </div>
  )
}
export { Chat }
