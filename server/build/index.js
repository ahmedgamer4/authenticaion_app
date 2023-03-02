import express from 'express';
const app = express();
import mongoose from 'mongoose';
import { userRouter } from './controllers/user.js';
import { MONGODB_URI, PORT } from './utils/config.js';
mongoose
    .connect(MONGODB_URI)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((err) => {
    console.error(err);
});
app.use(express.json());
app.use('/api/users', userRouter);
app.listen(PORT, () => {
    console.log(`Server is listening of port ${PORT}`);
});
export default app;
//# sourceMappingURL=index.js.map