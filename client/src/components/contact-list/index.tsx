import { FC } from 'react';
import styles from './styles.module.scss';
import { useStore } from '@/store';
import { Avatar } from '@mui/material';
import cn from 'classnames';
import { ContactInfo } from '@/types/contact-info';
import { ChannelInfo } from '@/types/channel-info';

type Props = {
  contacts: (ContactInfo | ChannelInfo)[];
  isChannel: boolean;
};

const ContactList: FC<Props> = ({ contacts, isChannel }) => {
  const { selectedChatData, setSelectedChatType, setSelectedChatData, setSelectedChatMessages } = useStore();

  const handleClick = (contact: ContactInfo | ChannelInfo) => {
    setSelectedChatType(isChannel ? 'channel' : 'contact');
    setSelectedChatData(contact);

    if (selectedChatData?._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };

  return (
    <div className={styles['contact-list']}>
      {contacts?.map((contact: ContactInfo | ChannelInfo) => {
        const isSelected = selectedChatData?._id === contact._id;
        return (
          <div
            key={contact._id}
            className={cn(styles.contact, {
              [styles.selected]: isSelected,
            })}
            onClick={() => handleClick(contact)}
          >
            <div className={styles['chat-wrapper']}>
              {!isChannel && 'firstName' in contact && 'lastName' in contact && (
                <Avatar sx={{ width: 50, height: 50 }}>
                  {contact.firstName[0] + contact.lastName[0]}
                </Avatar>
              )}

              {isChannel && 'name' in contact && (
                <div className={styles['channel-name']}>
                  <Avatar sx={{ width: 50, height: 50 }}>
                    #
                  </Avatar>
                </div>
              )}

              {isChannel && 'name' in contact ? (
                <span>{contact.name}</span>
              ) : (
                'firstName' in contact && 'lastName' in contact && (
                  <span>{`${contact.firstName} ${contact.lastName[0]}`}</span>
                )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { ContactList };
