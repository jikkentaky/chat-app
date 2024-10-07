import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from '@/components/app'

import './index.scss'
import { SocketProvider } from './context/socket-context'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </StrictMode>,
)
