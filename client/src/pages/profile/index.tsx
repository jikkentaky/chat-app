import { useStore } from "@/store"
import { BackButton } from "@/ui-components/back-button"
import { CustomInput } from "@/ui-components/custom-input";
import Avatar from '@mui/material/Avatar';
import styles from './styles.module.scss'
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UPDATE_USER_INFO_ROUTE, userInfoSchema } from "@/utils/config";
import { Panel } from "@/ui-components/panel";
import { CustomButton } from "@/ui-components/custom-button";
import { apiClient } from "@/lib/api-client";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Profile = () => {
  const { userInfo, setUserInfo } = useStore()
  const navigate = useNavigate()

  const userForm = useForm({
    resolver: yupResolver(userInfoSchema),
    defaultValues: {
      email: userInfo?.email || '',
      firstName: userInfo?.firstName || '',
      lastName: userInfo?.lastName || '',
    },
  })

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await apiClient.patch(UPDATE_USER_INFO_ROUTE, { data }, { withCredentials: true })
      console.log("🚀 ~ onSubmit ~ response:", response)

      if (response.status === 200) {
        setUserInfo(response.data.user)
        navigate('/chat')
        toast.success('User info updated')
      }
    } catch (error) {
      toast.error('Cannot update user info')
    }
  }

  return (
    <section className={styles.section}>
      <Panel className={styles.panel}>
        <BackButton className={styles['back-button']} />

        <Avatar sx={{ width: 100, height: 100 }}>
          {(userInfo?.firstName && userInfo?.lastName) && userInfo.firstName[0] + userInfo.lastName[0]}
        </Avatar>

        <form className={styles.form} onSubmit={userForm.handleSubmit(onSubmit)}>
          <CustomInput
            name="email"
            disabled
            control={userForm.control}
            label="Email"
            className={styles['custom-input']}
          />

          <CustomInput
            name="firstName"
            control={userForm.control}
            label="First Name"
            type="text"
            error={!!userForm.formState.errors.firstName}
            helperText={userForm.formState.errors.firstName?.message}
            className={styles['custom-input']}
          />

          <CustomInput
            name="lastName"
            control={userForm.control}
            label="Last Name"
            type="text"
            error={!!userForm.formState.errors.lastName}
            helperText={userForm.formState.errors.lastName?.message}
            className={styles['custom-input']}
          />

          <CustomButton className={styles['custom-button']} type="submit">
            Save
          </CustomButton>
        </form>
      </Panel>
    </section>
  )
}

export { Profile }
