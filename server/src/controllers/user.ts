import bcrypt from 'bcrypt'
import express from 'express'
import mongoose from 'mongoose'
import { User } from '../models/user.js'
import passport from 'passport'
import url from 'url';
import { cloudinary, upload } from '../utils/cloudnary.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const userRouter = express.Router()

interface MulterRequest extends Request {
  file: any;
}

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
    // failureFlash: true,
  }))  

userRouter.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload((req as any).file.path)

    const user = await User.findById((req.user as UserType)._id)
    user.photo = result.secure_url
    await user.save();

    res.status(200).send({ message: 'Profile image updated successfully' })
  } catch (err) {
    res.status(400).send({ message: 'Error updating profile image' })
  }
});

userRouter.put('/:id', upload.single('image'), async (req, res) => {
  const { body } = req
  console.log('body', body)
  const { id } = req.params

  try {
    let passwordHash: string

    if (body.password) {
      passwordHash = await bcrypt.hash(body.password, 10)
    }

    const user = await User.findById({ _id: id })

    const newUser = {
      passwordHash: passwordHash ? passwordHash : user.passwordHash,
      bio: body.bio, 
      email: body.email ? body.email : user.email,
      phone: body.phone,
      googleId: user.googleId,
      githubId: user.githubId,
      facebookId: user.facebookId,
      username: body.username,
    }
    const updatedUser = await User.findByIdAndUpdate({ _id: id }, newUser, { new: true })

    if (!updatedUser) return res.status(404).end()

    console.log('updated user', updatedUser)

    res.json(updatedUser)
  } catch(err) {
    return res.status(500).json({ error: err })
  }
})

userRouter.get('/logout', (req, res) => {
  req.session.destroy(() => {
    console.log(req.user)
    res.redirect('/login')
  })
})

