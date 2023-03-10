import passport from 'passport'
import bcrypt from 'bcrypt'
import { Strategy } from 'passport-local'
import Google from 'passport-google-oauth2'
import Facebook from 'passport-facebook'
import Github from 'passport-github'
import { User } from '../models/user.js'
import { FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET } from './config.js'
import { UserType } from '../controllers/user.js'

const LocalStrategy = Strategy
const GoogleStrategy = Google.Strategy
const FacebookStrategy = Facebook.Strategy
const GithubStrategy = Github.Strategy

passport.use(new LocalStrategy({usernameField: 'email'},
  async (email, password, done) => {
    const user = await User.findOne({ email: email })
    console.log(user)
    if (!user) { return done(null, false, { message: 'Invalid username or password' }); }
    bcrypt.compare(password, user.passwordHash, (err: Error, res: Express.Response) => {
      if (res) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid username or password' });
      }
    })
  }))

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://authentication-app-9yax.onrender.com/api/users/auth/google/callback',
  scope: ['profile', 'email']
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

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: 'https://authentication-app-9yax.onrender.com/api/users/auth/facebook/callback',
  scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, cb) => {
    const user = await User.findOne({ facebookId: profile.id })
    if (!user) {
      const newUser = new User({
        facebookId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
      }) 
      await newUser.save()
      return cb(null, newUser)
    }
    return cb(null, user)
}))

passport.use(new GithubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: 'https://authentication-app-9yax.onrender.com/api/users/auth/github/callback',
  scope: ['profile', 'email'],
}, async (accessToken, refreshToken, profile, cb) => {
    const user = await User.findOne({ githubId: profile.id })
    if (!user) {
      const newUser = new User({
        githubId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
      }) 
      await newUser.save()
      return cb(null, newUser)
    }
    return cb(null, user)
}))

passport.serializeUser((user, cb) => {
  cb(null, user)
}) 

passport.deserializeUser((user, cb) => {
  cb(null, user)
})

export default passport
