import express from 'express';
import dotenv from 'dotenv';
import db from './config/database.js';
import userRouter from './router/usersRouter.js';
import authenticationRouter from './authentications/authenticationRouter.js';
import suggestionRouter from './router/suggestionRouter.js';
import reportRouter from './router/reportRouter.js';
import reviewRouter from './router/reviewRouter.js';
import appointmentRouter from './router/appointmentRouter.js';
import faqRouter from './router/faqRouter.js';
import transportRouter from './router/transportRouter.js';
import serviceRouter from './router/serviceRouter.js';
import printRouter from './router/printRouter.js';
import { errorHandler } from './middleware/errorHandler.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use(errorHandler);

app.use('/api/users', userRouter);
app.use('/api/services', serviceRouter);
app.use('/api/suggestions', suggestionRouter);
app.use('/api/transportations', transportRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/auth', authenticationRouter);
app.use('/api/reports', reportRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/faqs', faqRouter);
app.use('/api/print', printRouter);
app.use('/api/uploads', express.static('uploads'));

db().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
