import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import config from './config'
import { authRoutes } from './routes/auth-routes'
import { contactRoutes } from './routes/contact-routes'
import { messagesRoutes } from './routes/messages-routes'

const app = express()

// Cors
app.use(cors({
  origin: config.origin,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}))
// Parser
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/uploads/files', express.static('uploads/files'))

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes)
app.use('/api/messages', messagesRoutes)

export default app;

