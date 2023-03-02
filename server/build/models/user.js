import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        required: true,
    },
    passwordHash: String,
});
export const User = mongoose.model('User', userSchema);
//# sourceMappingURL=user.js.map