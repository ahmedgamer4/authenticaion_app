import mongoose from 'mongoose'
import passport from 'passport'
import Google from 'passport-google-oauth2'
import { User } from '../models/user.js'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './config.js'

const GoogleStrategy = Google.Strategy

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3001/auth/google/callback',
}, 
  (accessToken, refreshToken, profile, cb) => {
    User.findOne({ googleId: profile.id }, (err: mongoose.Error, user: typeof User) => {
      if (err) return cb(err)
      if (!user) {
        const newUser = new User({
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
        }) 
        newUser.save()
      }
      return cb(null, user)
    })
    return cb(null, profile)
  }
))

passport.serializeUser((user, cb) => {
  cb(null, user)
}) 

passport.deserializeUser((user, cb) => {
  cb(null, user)
})
