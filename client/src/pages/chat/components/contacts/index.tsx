import { useEffect } from 'react'
import { NewDM } from './copmponents/new-dm'
import { ProfileInfo } from './copmponents/profile-info'
import styles from './styles.module.scss'
import { Typography } from '@/ui-components/typography'
import { apiClient } from '@/lib/api-client'
import { GET_CONTACTS_FOR_DM_LIST_ROUTE } from '@/utils/config'
import toast from 'react-hot-toast'
import { useStore } from '@/store'
import { ContactList } from '@/components/contact-list'


const Contacts = () => {
  const { directMessagesContacts, setDirectMessagesContacts } = useStore()

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await apiClient.get(
          GET_CONTACTS_FOR_DM_LIST_ROUTE,
          { withCredentials: true }
        );

        if (response.status === 200 && response.data.contacts) {
          console.log("🚀 ~ getContacts ~ response.data.contacts:", response.data.contacts)
          setDirectMessagesContacts(response.data.contacts)
        }
      } catch (error) {
        toast.error('Cannot get contacts')
      }
    }

    getContacts()
  }, [])

  return (
    <div className={styles.contacts}>
      <Typography variant='h1' className={styles['chat-title']}>
        ConnectZone
      </Typography>

      <div className={styles.rooms}>
        <div className={styles.room}>
          <Typography variant='h6' className={styles['sub-title']}>
            direct messages
          </Typography>

          <NewDM />
        </div>

        <div className={styles['list-wrapper']}>
          <ContactList contacts={directMessagesContacts} isChannel={false} />
        </div>

        <div className={styles.room}>
          <Typography variant='h6' className={styles['sub-title']}>
            channels
          </Typography>

          <NewDM />
        </div>
      </div>

      <ProfileInfo />
    </div>
  )
}

export { Contacts }
