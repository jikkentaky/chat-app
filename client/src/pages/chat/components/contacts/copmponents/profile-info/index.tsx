import { Avatar } from '@mui/material'
import styles from './styles.module.scss'
import { useStore } from '@/store'
import { Typography } from '@/ui-components/typography'
import { CustomButton } from '@/ui-components/custom-button'
import { PiPencilLight } from "react-icons/pi";
import { useNavigate } from 'react-router-dom'
import { IoPowerSharp } from 'react-icons/io5'
import { apiClient } from '@/lib/api-client'
import { LOG_OUT_ROUTE } from '@/utils/config'
import toast from 'react-hot-toast'

const ProfileInfo = () => {
  const { userInfo, setUserInfo } = useStore()
  const navigate = useNavigate()

  const handleEditProfile = () => {
    navigate('/profile')
  }

  const handleLogout = async () => {
    try {
      const response = await apiClient.post(LOG_OUT_ROUTE, {}, { withCredentials: true });

      if (response.status === 200) {
        setUserInfo(null)
        navigate('/auth')
      }
    } catch (error) {
      toast.error('Cannot logout')
    }
  }

  return (
    <div className={styles['profile-info']}>
      <div className={styles['wrapper']}>
        <div className={styles.info}>
          <Avatar sx={{ width: 50, height: 50 }}>
            {(userInfo?.firstName && userInfo?.lastName) && userInfo.firstName[0] + userInfo.lastName[0]}
          </Avatar>

          <Typography className={styles['name']}>
            {userInfo?.firstName} {userInfo?.lastName}
          </Typography>
        </div>

        <div className={styles.buttons}>
          <CustomButton
            className={styles['edit-button']}
            onClick={handleEditProfile}
            title='Edit profile'
          >
            <PiPencilLight className={styles['edit-icon']} />
          </CustomButton>

          <CustomButton
            className={styles['logout-button']}
            onClick={handleLogout}
            title='Logout'
          >
            <IoPowerSharp className={styles['logout-icon']} />
          </CustomButton>
        </div>
      </div>
    </div>
  )
}
export { ProfileInfo }
