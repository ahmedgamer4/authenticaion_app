import passport from 'passport';
import Google from 'passport-google-oauth2';
import Facebook from 'passport-facebook';
import Github from 'passport-github';
import { User } from '../models/user.js';
import { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './config.js';
const GoogleStrategy = Google.Strategy;
const FacebookStrategy = Facebook.Strategy;
const GithubStrategy = Github.Strategy;
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/api/users/auth/google/callback',
}, async (accessToken, refreshToken, profile, cb) => {
    const user = await User.findOne({ googleId: profile.id });
    if (!user) {
        const newUser = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
        });
        await newUser.save();
        return cb(null, newUser);
    }
    return cb(null, user);
}));
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/api/users/auth/facebook/callback'
}, async (accessToken, refreshToken, profile, cb) => {
    const user = await User.findOne({ facebookId: profile.id });
    if (!user) {
        const newUser = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
        });
        await newUser.save();
        return cb(null, newUser);
    }
    return cb(null, user);
}));
passport.use(new GithubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/api/users/auth/github/callback'
}, async (accessToken, refreshToken, profile, cb) => {
    const user = await User.findOne({ githubId: profile.id });
    if (!user) {
        const newUser = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
        });
        await newUser.save();
        return cb(null, newUser);
    }
    return cb(null, user);
}));
passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((user, cb) => {
    cb(null, user);
});
export default passport;
//# sourceMappingURL=passport.js.map