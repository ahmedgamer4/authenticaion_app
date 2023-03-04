import bcrypt from 'bcrypt'
import express from 'express'
import mongoose from 'mongoose'
import { User } from '../models/user.js'
import passport from 'passport'
import jwt from 'jsonwebtoken'

export const userRouter = express.Router()

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

userRouter.get('/', async (req, res) => {
  const users = await User.find({})

  return res.status(200).json(users)
})

userRouter.get('/auth/google', (req, res) => {
  passport.authenticate('google', { scope: ['profile', 'email'] })
});

userRouter.get('/auth/google/callback', (req, res) => {
  passport.authenticate('google', { failureRedirect: '/login' })
})

userRouter.post('/register', async (req, res) => {
  type BodyType = {
    username: string;
    password: string;
    photo: string;
    bio: string;
    phone: string;
    email: string;
  }

  const { username, password, bio, email, phone, photo } = req.body as BodyType

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({
      error: 'User already exists',
    }) 
  }

  if (!username || !password) {
    return res.status(400).json({
      error: 'must provide a username and password',
   })
  }

  if (password.length < 3 || username.length < 3) {
    return res.status(400).json({
      error: 'username and password cannot be less than 3 characters'
    })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username, 
    passwordHash,
    photo,
    phone,
    email, 
    bio
  })

  console.log(user)

  const savedUser = user.save()

  return res.status(201).json(savedUser)
})

userRouter.post('/login', async (req, res) => {
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

userRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  console.log(id)
  const isValidId = mongoose.Types.ObjectId.isValid(id)

  try {

    if (id && isValidId) {
      const user = await User.findById({ _id: id })
      return res.json(user)
    } else {
      return res.status(404).send('Link is not found')
    }

  } catch(err) {
    return res.status(500).json(err)
  }
})
