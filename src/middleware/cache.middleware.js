import { getRedisClient } from '../model/connection.js';

export const cacheMiddleware = (req, res, next) => {
  const client = getRedisClient();
  const cacheKey = req.originalUrl;
  client.get(cacheKey, (err, data) => {
    if (err) return next(err);

    if (data !== null) {
      res.json(JSON.parse(data));
    }
  });
  next();
};
