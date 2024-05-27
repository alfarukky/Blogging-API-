import mongoose from 'mongoose';
import { createClient } from 'redis';

let redisClient;

export const connectMongoDB = async (MONGO_URI) => {
  if (!MONGO_URI) {
    throw new Error('MongoDB URI is not provided');
  }
  return mongoose.connect(MONGO_URI);
};

export const connectRedis = async (REDIS_PORT) => {
  redisClient = createClient(REDIS_PORT);
  redisClient.on('error', (err) => console.error('Redis Client Error', err));
  await redisClient.connect();
  return redisClient;
};

export const getRedisClient = () => {
  if (!redisClient) {
    throw new Error('Redis client is not connected');
  }
  return redisClient;
};
