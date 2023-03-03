import bcrypt from 'bcrypt'
import express from 'express'
import mongoose from 'mongoose'
import { User } from '../models/user.js'

export const userRouter = express.Router()

userRouter.get('/', async (req, res) => {
  const users = await User.find({})

  return res.status(200).json(users)
})

userRouter.post('/', async (req, res) => {
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
