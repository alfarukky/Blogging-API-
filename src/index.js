import express from 'express';
import dotenv from 'dotenv';
import { limiter } from './middleware/limiter.middleware.js';
import mongoose from 'mongoose';
import logger from './utils/winston.utils.js';
import authRoute from './routes/auth.route.js';
import errorMiddleware from './middleware/error.middleware.js';
import articleRoute from './routes/article.route.js';

dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use('/api', limiter);
app.use('/api/auth', authRoute);
app.use('/api/article', articleRoute);

//handle error using winston
app.use(errorMiddleware);

//catch all route
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

export default app;
