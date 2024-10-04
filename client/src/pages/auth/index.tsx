import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { Tab, Tabs } from '@mui/material'
import * as yup from 'yup'

import { CustomInput } from '@/ui-components/custom-input'
import { ChatIcon } from '@/ui-components/icons/chat-icon'
import { Typography } from '@/ui-components/typography'

import styles from './styles.module.scss'
import { CustomButton } from '@/ui-components/custom-button'

const loginSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

const signUpSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), ''], 'Passwords must match'),
})

const Auth = () => {
  const [value, setValue] = useState(0)

  const loginForm = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const signUpForm = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  })

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleLoginSubmit = (data: FieldValues) => {
    console.log('Login Data:', data)
  }

  const handleSignUpSubmit = (data: FieldValues) => {
    console.log('Signup Data:', data)
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
              name="username"
              control={loginForm.control}
              label="Username"
              error={!!loginForm.formState.errors.username}
              helperText={loginForm.formState.errors.username?.message}
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
              name="username"
              control={signUpForm.control}
              label="Username"
              error={!!signUpForm.formState.errors.username}
              helperText={signUpForm.formState.errors.username?.message}
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
