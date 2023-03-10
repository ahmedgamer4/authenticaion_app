import dotenv from 'dotenv'

dotenv.config()

export const { 
  PORT,
  SECRET,
  MONGO_URI,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
} = process.env

