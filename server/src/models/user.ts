import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    required: true,
  },
  passwordHash: String, 
  photo: String,
  bio: String,
  phone: String,
  email: String,
  googleId: String,
  twitterId: String,
  facebookId: String,
  githubId: String,
})

export const User = mongoose.model('User', userSchema)

