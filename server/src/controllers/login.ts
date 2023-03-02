import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import express from 'express'
import { User } from '../models/user.js'

const loginRouter = express.Router()

type BodyType = {
  username: string;
  password: string;
}

type UserType = {
  username: string;
  passwordHash: string;
  _id: string;
  __v: number;
}

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body as BodyType

  const user: UserType = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
  )

  res.status(200)
    .send({ token, username: user.username })
})  

export default loginRouter
