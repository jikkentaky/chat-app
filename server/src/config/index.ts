import env from 'dotenv'
import path from 'path'
env.config({ path: path.join(process.cwd(), '.env') })
export default {
  port: process.env.PORT || 3434,
  database_url: process.env.DATABASE_URL,
  jwt_secret: process.env.JWT_SECRET,
  origin: process.env.ORIGIN,
}
