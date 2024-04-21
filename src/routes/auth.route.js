import { Router } from 'express';
import * as useController from '../controllers/auth.controller.js';
import { generateMiddleWare } from '../middleware/route.middleware.js';
import { loginSchema, registerSchema } from '../validation/auth.validation.js';

const authRoute = Router();

authRoute.post(
  '/register',
  generateMiddleWare(registerSchema),
  useController.register
);
authRoute.post('/login', generateMiddleWare(loginSchema), useController.login);

export default authRoute;
