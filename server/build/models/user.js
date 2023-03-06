import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
    },
    passwordHash: String,
    photo: String,
    bio: String,
    phone: String,
    email: {
        type: String,
        minLength: 5,
    },
    googleId: String,
    twitterId: String,
    facebookId: String,
    githubId: String,
});
export const User = mongoose.model('User', userSchema);
//# sourceMappingURL=user.js.map