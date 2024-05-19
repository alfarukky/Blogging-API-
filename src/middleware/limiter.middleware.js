import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 mins
  max: 100, //limit each IP to 100 requests per windowMs
  message: 'Too many API request from the IP, please try again after 15mins',
});
