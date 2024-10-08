import { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { FaPlus } from 'react-icons/fa'
import { CustomButton } from '@/ui-components/custom-button'
import { Modal } from '@mui/material'
import { Typography } from '@/ui-components/typography'
import { RiCloseFill } from 'react-icons/ri'
import { apiClient } from '@/lib/api-client'
import { CREATE_CHANNEL_ROUTE, GET_ALL_CONTACTS } from '@/utils/config'
import { useStore } from '@/store'
import { ContactInfo } from '@/types/contact-info'
import toast from 'react-hot-toast'
import { MultiSelect } from '@/ui-components/multi-select'

const CreateChannel: FC = () => {
  const { addChannel } = useStore()
  const [isNewChannelModal, setIsNewChannelModal] = useState(false)
  const [, setSearchValue] = useState<ContactInfo[] | null>(null)
  const [allContacts, setAllContacts] = useState<ContactItem[] | null>(null)
  const [selectedContacts, setSelectedContacts] = useState<ContactItem[] | null>(null)
  const [channelName, setChannelName] = useState('')

  useEffect(() => {
    const getAllContacts = async () => {
      try {
        const response = await apiClient.get(
          GET_ALL_CONTACTS, { withCredentials: true }
        )

        if (response.status === 200 && response.data.contacts) {
          setAllContacts(response.data.contacts)
        }
      } catch (error) {
        toast.error('Cannot get contacts')
      }
    }

    getAllContacts()
  }, [])

  const handleOpenNewChannelModal = () => {
    setIsNewChannelModal(true)
  }

  const handleClose = () => {
    setIsNewChannelModal(false)
    setSearchValue([])
  }

  const createChannel = async () => {
    if (!channelName.length && !selectedContacts) return

    try {
      const response = await apiClient.post(
        CREATE_CHANNEL_ROUTE,
        {
          name: channelName,
          members: selectedContacts?.map(contact => contact.value)
        }, { withCredentials: true }
      )

      if (response.status === 201) {
        setChannelName('')
        setSelectedContacts(null)
        setIsNewChannelModal(false)
        addChannel(response.data.channel)
      }
    } catch (error) {
      toast.error('Cannot create channel')
    }
  }

  return (
    <>
      <CustomButton className={styles['open-contact']} onClick={handleOpenNewChannelModal}>
        <FaPlus title='Create new channel' />
      </CustomButton>

      <Modal
        open={isNewChannelModal}
        onClose={handleClose}
      >
        <div className={styles['modal-content']}>
          <div className={styles['modal-wrapper']}>

            <CustomButton className={styles['close-button']} onClick={handleClose}>
              <RiCloseFill className={styles['close-icon']} />
            </CustomButton>

            <Typography variant='h6' className={styles['title']}>
              Create new channel.
            </Typography>

            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder='Please enter channel name...'
              className={styles['search']}
            />

            <MultiSelect data={allContacts} setSelectedContacts={setSelectedContacts} />

            <CustomButton className={styles['create-button']} onClick={createChannel}>
              Create channel
            </CustomButton>
          </div>
        </div>
      </Modal>
    </>
  )
}

export { CreateChannel }
