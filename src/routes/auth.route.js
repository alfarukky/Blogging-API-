import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { generateMiddleWare } from '../middleware/route.middleware.js';
import { registerSchema } from '../validation/auth.validation.js';

const authRoute = Router();

authRoute.post(
  '/register',
  generateMiddleWare(registerSchema),
  authController.register
);

export default authRoute;
