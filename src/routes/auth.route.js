import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { generateMiddlware } from '../middleware/route.middleware';
import { registerSchema } from '../validation/auth.validation.js';

const authRoute = Router();

authRoute.post(
  '/register',
  generateMiddlware(registerSchema),
  authController.register
);

export default authRoute;
