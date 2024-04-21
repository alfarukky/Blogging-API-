import Joi from 'joi';

export const registerSchema = Joi.object({
  first_name: Joi.string().min(3).max(50).required(),
  last_name: Joi.string().min(3).max(50).required(),
  email: Joi.string().min(3).max(255).required().email(),
  password: Joi.string().min(3).max(255).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().min(3).max(255).required().email(),
  password: Joi.string().min(3).max(255).required(),
});
