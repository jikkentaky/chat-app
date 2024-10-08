import { FC } from 'react';
import { CustomButton } from '@/ui-components/custom-button';
import { RiCloseFill } from 'react-icons/ri';
import styles from './styles.module.scss';
import { useStore } from '@/store';
import { Avatar } from '@mui/material';
import { Typography } from '@/ui-components/typography';

const ChatHeader: FC = () => {
  const { selectedChatData, setSelectedChatData, setSelectedChatType } = useStore();

  const closeChat = () => {
    setSelectedChatData(null);
    setSelectedChatType(null);
  };

  return (
    <div className={styles['chat-header']}>
      <div className={styles['wrapper']}>
        <div className={styles.header}>
          {selectedChatData && 'firstName' in selectedChatData && 'lastName' in selectedChatData && (
            <Avatar sx={{ width: 50, height: 50 }}>
              {selectedChatData.firstName[0] + selectedChatData.lastName[0]}
            </Avatar>
          )}

          {selectedChatData && 'name' in selectedChatData && (
            <Avatar sx={{ width: 50, height: 50 }}>
              #
            </Avatar>
          )}

          <Typography className={styles['name']}>
            {selectedChatData && 'firstName' in selectedChatData && 'lastName' in selectedChatData
              ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
              : selectedChatData && 'name' in selectedChatData
                ? selectedChatData.name
                : ''}
          </Typography>
        </div>
      </div>

      <div className={styles['wrapper']}>
        <CustomButton className={styles['close-button']} onClick={closeChat}>
          <RiCloseFill className={styles['close-icon']} />
        </CustomButton>
      </div>
    </div>
  );
};

export { ChatHeader };
