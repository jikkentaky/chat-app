import { ChangeEvent, FC, useState } from 'react'
import styles from './styles.module.scss'
import { FaPlus } from 'react-icons/fa'
import { CustomButton } from '@/ui-components/custom-button'
import { Modal } from '@mui/material'
import { Typography } from '@/ui-components/typography'
import { RiCloseFill } from 'react-icons/ri'
import { EmptyChat } from '@/pages/chat/components/empty-chat'
import { apiClient } from '@/lib/api-client'
import { SEARCH_CONTACT_ROUTE } from '@/utils/config'

const NewDM: FC = () => {
  const [isOpenContactModal, setIsOpenContactModal] = useState(false)
  const [searchValue, setSearchValue] = useState([])

  const handleOpenContactModal = () => {
    setIsOpenContactModal(true)
  }

  const handleClose = () => {
    setIsOpenContactModal(false)
  }

  const handleSearchContact = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!searchValue.length) {
        const response = await apiClient.post(
          SEARCH_CONTACT_ROUTE,
          { searchTerm: event.target.value },
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
              onChange={handleSearchContact}
            />

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
