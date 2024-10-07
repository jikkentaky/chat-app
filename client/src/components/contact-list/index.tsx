import { FC } from 'react'
import styles from './styles.module.scss'
import { useStore } from '@/store'
import { Avatar } from '@mui/material'
import cn from 'classnames'

type Props = {
  contacts: any
  isChannel: boolean
}

const ContactList: FC<Props> = ({ contacts, isChannel }) => {
  const { selectedChatData, selectedChatType, setSelectedChatType, setSelectedChatData, setSelectedChatMessages } = useStore()

  const handleClick = (contact: any) => {
    setSelectedChatType(isChannel ? 'channel' : 'contact');
    setSelectedChatData(contact);

    if (selectedChatData?._id !== contact._id) {
      setSelectedChatMessages([])
    }
  }

  return (
    <div className={styles['contact-list']}>
      {contacts.map((contact: any) => {
        const isSelected = selectedChatData?._id === contact._id
        return (
          <div
            key={contact._id}
            className={cn(styles.contact, {
              [styles.selected]: isSelected,
            })}
            onClick={() => handleClick(contact)}
          >
            <div className={styles['chat-wrapper']}>
              {!isChannel && (
                <Avatar
                  sx={{ width: 20, height: 20 }}
                >
                  {(contact?.firstName && contact?.lastName) && contact.firstName[0] + contact.lastName[0]}
                </Avatar>
              )}

              {isChannel && (
                <div className={styles['channel-name']}>
                  #
                </div>
              )}

              {isChannel ? (
                <span>{contact.name}</span>
              ) : (
                <span>{`${contact.firstName} ${contact.lastName}`}</span>
              )}
            </div>
          </div>
        )
      }
      )}
    </div>
  )
}

export { ContactList }
