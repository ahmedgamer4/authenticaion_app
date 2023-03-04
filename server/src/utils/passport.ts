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
  async (accessToken, refreshToken, profile, cb) => {
    const user = await User.findOne({ googleId: profile.id })
    if (!user) {
      const newUser = new User({
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
      }) 
      await newUser.save()
      return cb(null, newUser)
    }
    return cb(null, user)
  }
))

passport.serializeUser((user, cb) => {
  cb(null, user)
}) 

passport.deserializeUser((user, cb) => {
  cb(null, user)
})
