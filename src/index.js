import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.route.js';
import errorMiddleware from './middleware/error.middleware.js';
import logger from './Exception/winston.exception.js';

dotenv.config();
const app = express();

const { MONGO_URI } = process.env;
const { PORT } = process.env || 4000;

//middleware
app.use(express.json());
app.use('/api/auth', authRoute);

//handle error using winston
app.use(errorMiddleware);

//catch all route
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('connected to DB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error(err.message, err);
    console.log('Something went wrong', err);
  });
