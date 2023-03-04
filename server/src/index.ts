import express from 'express'
const app = express()
import mongoose from 'mongoose'
import passport from './utils/passport.js'
import cookieSession from 'cookie-session'
import loginRouter from './controllers/login.js'
import { userRouter } from './controllers/user.js'
import { MONGO_URI, PORT } from './utils/config.js'



mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error(err)
  })

app.use(express.json())

app.use(cookieSession({
  name: 'tuto-session',
  keys: ['key1', 'key2']
}))

app.use(passport.initialize())
app.use(passport.session())
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.listen(PORT, () => {
  console.log(`Server is listening of port ${PORT}`)
})

export default app
