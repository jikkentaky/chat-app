import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { Tab, Tabs } from '@mui/material'


import { CustomInput } from '@/ui-components/custom-input'
import { ChatIcon } from '@/ui-components/icons/chat-icon'
import { Typography } from '@/ui-components/typography'

import styles from './styles.module.scss'
import { CustomButton } from '@/ui-components/custom-button'
import { apiClient } from '@/lib/api-client'
import { LOGIN_ROUTE, loginSchema, SIGN_UP_ROUTE, signUpSchema } from '@/utils/config'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { APP_ROUTE } from '@/types/enums/route'
import { useStore } from '@/store'



const Auth = () => {
  const [value, setValue] = useState(0)
  const { setUserInfo } = useStore()
  const navigate = useNavigate()

  const loginForm = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const signUpForm = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleLoginSubmit = async (fieldValues: FieldValues) => {
    const { email, password } = fieldValues;

    try {
      const response = await apiClient.post(LOGIN_ROUTE, {
        email,
        password
      }, { withCredentials: true })

      if (response.status === 201) {
        setUserInfo(response.data.user)
        if (response.data.user.profileSetup) {
          navigate(APP_ROUTE.CHAT)
        } else {
          navigate(APP_ROUTE.PROFILE)
        }
      }
    } catch (error) {
      toast.error('Cannot login user')
    }
  }

  const handleSignUpSubmit = async (fieldValues: FieldValues) => {
    const { email, password } = fieldValues
    try {
      const response = await apiClient.post(SIGN_UP_ROUTE, {
        email,
        password
      }, { withCredentials: true })

      if (response.status === 201) {
        setUserInfo(response.data.user)
        navigate(APP_ROUTE.PROFILE)
      }
    } catch (error) {
      toast.error('Cannot register user')
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <div className={styles['title-wrapper']}>
          <Typography variant="h1" className={styles.title}>
            Welcome to ConnectZone
          </Typography>

          <ChatIcon />
        </div>

        <Tabs value={value} onChange={handleChange} centered className={styles.tabs}>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        {value === 0 && (
          <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className={styles['form']}>
            <CustomInput
              name="email"
              control={loginForm.control}
              label="Email"
              error={!!loginForm.formState.errors.email}
              helperText={loginForm.formState.errors.email?.message}
              className={styles['custom-input']}
            />

            <CustomInput
              name="password"
              control={loginForm.control}
              label="Password"
              type="password"
              error={!!loginForm.formState.errors.password}
              helperText={loginForm.formState.errors.password?.message}
              className={styles['custom-input']}
            />

            <CustomButton type="submit" className={styles.button}>
              Login
            </CustomButton>
          </form>
        )}

        {value === 1 && (
          <form onSubmit={signUpForm.handleSubmit(handleSignUpSubmit)} className={styles['form']}>
            <CustomInput
              name="email"
              control={signUpForm.control}
              label="Email"
              error={!!signUpForm.formState.errors.email}
              helperText={signUpForm.formState.errors.email?.message}
              className={styles['custom-input']}
            />

            <CustomInput
              name="password"
              control={signUpForm.control}
              label="Password"
              type="password"
              error={!!signUpForm.formState.errors.password}
              helperText={signUpForm.formState.errors.password?.message}
              className={styles['custom-input']}
            />

            <CustomInput
              name="confirmPassword"
              control={signUpForm.control}
              label="Confirm Password"
              type="password"
              error={!!signUpForm.formState.errors.confirmPassword}
              helperText={signUpForm.formState.errors.confirmPassword?.message}
              className={styles['custom-input']}
            />

            <CustomButton type="submit" color="primary" className={styles.button}>
              Sign Up
            </CustomButton>
          </form>
        )}
      </div>
    </section>
  )
}

export { Auth }
