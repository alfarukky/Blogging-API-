import { Router } from 'express';
import * as useController from '../controllers/article.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
//import { generateMiddleWare } from '../middleware/route.middleware.js';
const articleRoute = Router();

articleRoute.post('/create', authMiddleware, useController.createArticle);
articleRoute.patch(
  '/:articleId/update',
  authMiddleware,
  useController.updateArticleState
);

export default articleRoute;
