import dotenv from 'dotenv'

dotenv.config()

export const { PORT, SECRET, MONGO_URI, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

