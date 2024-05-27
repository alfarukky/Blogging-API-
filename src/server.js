import { connectMongoDB, connectRedis } from '../src/model/connection.js';
import app from './index.js';
import logger from './utils/winston.utils.js';

const { MONGO_URI, REDIS_PORT = 6379, PORT = 4000 } = process.env;

const startServer = async () => {
  try {
    await connectRedis(REDIS_PORT);
    console.log('Connected to Redis DB....');

    await connectMongoDB(MONGO_URI);
    console.log('Connected to Mongo DB....');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    logger.error('Error starting server', err);
    console.log('Failed to start server', err);
    process.exit(1);
  }
};

startServer();
