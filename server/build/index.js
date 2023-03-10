import express from 'express';
const app = express();
import mongoose from 'mongoose';
import passport from './utils/passport.js';
import session from 'express-session';
import { userRouter } from './controllers/user.js';
import { MONGO_URI, PORT, SECRET } from './utils/config.js';
import path from 'path';
import url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
app.use(express.static('dist'));
app.use(express.json());
mongoose
    .connect(MONGO_URI)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((err) => {
    console.error(err);
});
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'dist/index.html'), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});
app.use('/api/users', userRouter);
app.listen(PORT, () => {
    console.log(`Server is listening of port ${PORT}`);
});
export default app;
//# sourceMappingURL=index.js.map