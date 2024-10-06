import { NewDM } from './copmponents/new-dm'
import { ProfileInfo } from './copmponents/profile-info'
import styles from './styles.module.scss'
import { Typography } from '@/ui-components/typography'


const Contacts = () => {
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
