import { Router } from 'express';
import * as useController from '../controllers/article.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { cacheMiddleware } from '../middleware/cache.middleware.js';
const articleRoute = Router();

articleRoute.get(
  '/',
  authMiddleware,
  cacheMiddleware,
  useController.getOwnersArticle
);
articleRoute.get('/published', cacheMiddleware, useController.getArticles);
articleRoute.get('/:articleId/published', useController.getOneArticle);
articleRoute.post('/create', authMiddleware, useController.createArticle);
articleRoute.patch(
  '/:articleId/update',
  authMiddleware,
  useController.updateArticleState
);
articleRoute.put(
  '/:articleId/update',
  authMiddleware,
  useController.updateArticle
);

articleRoute.delete(
  '/:articleId/delete',
  authMiddleware,
  useController.deleteArticle
);

export default articleRoute;
