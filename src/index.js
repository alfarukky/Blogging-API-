import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.route.js';
import errorMiddleware from './middleware/error.middleware.js';
import logger from './utils/winston.exception.js';
import articleRoute from './routes/article.route.js';

dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/article', articleRoute);

//handle error using winston
app.use(errorMiddleware);

//catch all route
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

export default app;
