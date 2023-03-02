import express from 'express';
export const userRouter = express.Router();
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
userRouter.get('/', async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
});
userRouter.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({
            error: 'User already exists',
        });
    }
    if (!username || !password) {
        return res.status(400).json({
            error: 'must provide a username and password',
        });
    }
    if (password.length < 3 || username.length < 3) {
        return res.status(400).json({
            error: 'username and password cannot be less than 3 characters'
        });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
        username,
        passwordHash,
    });
    console.log(user);
    const savedUser = user.save();
    return res.status(201).json(savedUser);
});
//# sourceMappingURL=user.js.map