import dotenv from 'dotenv'

dotenv.config()

export const { PORT, SECRET } = process.env
export const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGO_URI
  : process.env.MONGO_URI

console.log(MONGODB_URI)
