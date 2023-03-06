import bcrypt from 'bcrypt'
import express from 'express'
import mongoose from 'mongoose'
import { User } from '../models/user.js'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { SECRET } from '../utils/config.js'

export const userRouter = express.Router()

type BodyType = {
  email: string;
  password: string;
}

type UserType = {
  username: string;
  _id: string;
  __v: number;
  passwordHash?: string; 
  photo?: string;
  bio?: string;
  phone?: string;
  email?: string;
  googleId?: string;
  twitterId?: string;
  facebookId?: string;
  githubId?: string;
}

userRouter.get('/', async (req, res) => {
  const users = await User.find({})

  return res.status(200).json(users)
})

userRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

userRouter.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({ userId: (req.user as UserType).googleId}, SECRET)
    // res.json({ token })
    // res.redirect(`http://localhost:3001/?token=${token}`)
    res.redirect(`/?token=${token}`)
  }
)

userRouter.get('/auth/facebook', passport.authenticate('facebook'));

userRouter.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({ userId: (req.user as UserType).facebookId}, SECRET)
    res.redirect(`/?token=${token}`)
  }
)

userRouter.get('/auth/github', passport.authenticate('github'));

userRouter.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({ userId: (req.user as UserType).facebookId}, SECRET)
    res.redirect(`/?token=${token}`)
  }
)

userRouter.post('/register', async (req, res) => {
  const { password, email } = req.body as BodyType

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({
      error: 'User already exists',
    }) 
  }

  if (!password) {
    return res.status(400).json({
      error: 'must provide a username and password',
   })
  }

  if (password.length < 3) {
    return res.status(400).json({
      error: 'password cannot be less than 3 characters'
    })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    passwordHash,
    email, 
  })

  console.log(user)

  const savedUser = await user.save()
  
  const userForToken = {
    id: savedUser._id,
  }

  const token = jwt.sign(
    userForToken,
    SECRET,
  )

  return res.status(201).json({ token })
})

userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body as BodyType

  const user: UserType = await User.findOne({ email })
  const passwordCorrect = user.passwordHash === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect) {
    return res.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    id: user._id,
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
  )

  res.status(200)
    .send({ token })
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

userRouter.put('/:id', async (req, res) => {
  const { body } = req
  const { id } = req.params
  const isValidId = mongoose.Types.ObjectId.isValid(id)

  try {
    if (id && isValidId) {
      const updatedUser = await User.findByIdAndUpdate({ _id: id }, body, { new: true })
      if (!updatedUser) return res.status(404).end()
      return res.status(200).json(updatedUser)
    }
  } catch(err) {
    return res.status(500).json(err)
  }
})
