import { FC } from 'react'
import styles from './styles.module.scss'
import { useStore } from '@/store'
import { Avatar } from '@mui/material'
import cn from 'classnames'
import { ContactInfo } from '@/types/contact-info'

type Props = {
  contacts: ContactInfo[]
  isChannel: boolean
}

const ContactList: FC<Props> = ({ contacts, isChannel }) => {
  const { selectedChatData, setSelectedChatType, setSelectedChatData, setSelectedChatMessages } = useStore()

  const handleClick = (contact: ContactInfo) => {
    setSelectedChatType(isChannel ? 'channel' : 'contact');
    setSelectedChatData(contact);

    if (selectedChatData?._id !== contact._id) {
      setSelectedChatMessages([])
    }
  }

  return (
    <div className={styles['contact-list']}>
      {contacts.map((contact: ContactInfo) => {
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
                  sx={{ width: 50, height: 50 }}
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
                <span>{contact.firstName}</span>
              ) : (
                <span>{`${contact.firstName} ${contact.lastName[0]}`}</span>
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
