import { ChangeEvent, FC, useCallback, useState } from 'react'
import styles from './styles.module.scss'
import { FaPlus } from 'react-icons/fa'
import { CustomButton } from '@/ui-components/custom-button'
import { Avatar, debounce, Modal } from '@mui/material'
import { Typography } from '@/ui-components/typography'
import { RiCloseFill } from 'react-icons/ri'
import { EmptyChat } from '@/pages/chat/components/empty-chat'
import { apiClient } from '@/lib/api-client'
import { SEARCH_CONTACT_ROUTE } from '@/utils/config'
import { useStore } from '@/store'

const NewDM: FC = () => {
  const { contact, setSelectedChatType, setSelectedChatData } = useStore()
  const [isOpenContactModal, setIsOpenContactModal] = useState(false)
  const [searchValue, setSearchValue] = useState([])

  const handleOpenContactModal = () => {
    setIsOpenContactModal(true)
  }

  const handleClose = () => {
    setIsOpenContactModal(false)
  }

  const handleSearchContact = async (contact: string) => {
    if (!contact) {
      setSearchValue([])
      return
    }

    try {
      if (!searchValue.length) {
        const response = await apiClient.post(
          SEARCH_CONTACT_ROUTE,
          { searchTerm: contact },
          { withCredentials: true }
        );

        if (response.status === 200) {
          setSearchValue(response.data.contacts)
        }
      } else {
        setSearchValue([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const debouncedSearch = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => {
      handleSearchContact(event.target.value);
    }, 500),
    []
  );

  const selectNewContact = (contact: any) => {
    setSelectedChatType('contact')
    setSelectedChatData(contact)
    setSearchValue([])
    handleClose()
  }

  return (
    <>
      <CustomButton className={styles['open-contact']} onClick={handleOpenContactModal}>
        <FaPlus title='Select a contact' />
      </CustomButton>

      <Modal
        open={isOpenContactModal}
        onClose={handleClose}
      >
        <div className={styles['modal-content']}>
          <div className={styles['modal-wrapper']}>

            <CustomButton className={styles['close-button']} onClick={handleClose}>
              <RiCloseFill className={styles['close-icon']} />
            </CustomButton>

            <Typography variant='h6' className={styles['title']}>
              Select a contact
            </Typography>

            <input
              type="text"
              placeholder='Select a contact'
              className={styles['search']}
              onChange={debouncedSearch}
            />

            {searchValue.length > 0 && (
              <div className={styles['contacts']}>

                {searchValue.map((contact: any) => (
                  <div className={styles['contact']} key={contact._id} onClick={() => selectNewContact(contact)}>
                    <Avatar sx={{ width: 50, height: 50 }}>
                      {(contact?.firstName && contact?.lastName) && contact.firstName[0] + contact.lastName[0]}
                    </Avatar>

                    <Typography className={styles['name']}>
                      {contact?.firstName}
                    </Typography>
                  </div>
                ))}
              </div>
            )}


            {!searchValue.length && (
              <EmptyChat />
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}

export { NewDM }
