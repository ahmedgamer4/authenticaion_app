import bcrypt from 'bcrypt'
import express from 'express'
import mongoose from 'mongoose'
import { User } from '../models/user.js'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { SECRET } from '../utils/config.js'
import path from 'path'
import url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const userRouter = express.Router()

type BodyType = {
  email: string;
  password: string;
}

export type UserType = {
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

// userRouter.get('*', function(req, res) {
//   console.log(__dirname)
//   res.sendFile(path.join(__dirname,'..', '..' , 'dist/index.html'), function(err) {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// })  

userRouter.get('/', async (req, res) => {
  if (req.isAuthenticated) {
    res.status(200).json(req.user)
  }
  console.log(req.user)
})

userRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

userRouter.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/')
  }
)

userRouter.get('/auth/facebook', passport.authenticate('facebook'));

userRouter.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/')
  }
)

userRouter.get('/auth/github', passport.authenticate('github'));

userRouter.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/')
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

  await user.save()
  
  res.end()
})

userRouter.post('/login',
  passport.authenticate('local', { 
    failureRedirect: '/login',
    successRedirect: '/',
    failureFlash: true,
  }))  

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

userRouter.get('/logout', (req: express.Request, res, next) => {
  // req.logout(() => {
  //   console.log(req.user)
  //   res.redirect('/login')
  // })

  req.session.destroy(() => {
    console.log(req.user)
    res.redirect('/login')
  })
})

