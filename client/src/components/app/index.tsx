import { FC } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router } from 'react-router-dom'

import { Layout } from '@/components/layout'

import styles from './styles.module.scss'

const App: FC = () => {
  return (
    <>
      <main className={styles.main}>
        <Router>
          <Layout />
        </Router>
      </main>

      <Toaster />
    </>
  )
}

export { App }
