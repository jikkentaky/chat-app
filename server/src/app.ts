import express, { Application, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import config from './config'
import authRoutes from './routes/auth-routes'
const app: Application = express()

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

app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app;

