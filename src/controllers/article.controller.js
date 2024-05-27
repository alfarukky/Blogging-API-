import * as useService from '../services/article.services.js';

export const getArticles = async (req, res) => {
  const {
    page = 1,
    limit = 20,
    author,
    title,
    tags,
    sortBy,
    sortOrder,
  } = req.query;
  const { originalUrl } = req;
  try {
    const users = await useService.getArticles(
      page,
      limit,
      author,
      title,
      tags,
      sortBy,
      sortOrder,
      originalUrl
    );
    res.status(200).json({ message: 'Get all articles', data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createArticle = async (req, res) => {
  const author = req.user.sub;
  const { title, description, body, tags } = req.body;
  try {
    const result = await useService.createArticle(
      author,
      title,
      description,
      body,
      tags
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateArticleState = async (req, res) => {
  const userId = req.user.sub;
  const { articleId } = req.params;
  const newState = req.body.state;
  try {
    const result = await useService.updateArticleState(
      userId,
      articleId,
      newState
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const getOneArticle = async (req, res) => {
  const { articleId } = req.params;
  const { originalUrl } = req;
  try {
    const result = await useService.getOneArticle(articleId, originalUrl);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const getOwnersArticle = async (req, res) => {
  const { page = 1, limit = 20, state } = req.query;
  const userId = req.user.sub;
  const { originalUrl } = req;
  try {
    const result = await useService.getOwnersArticle(
      userId,
      page,
      limit,
      state,
      originalUrl
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const userId = req.user.sub;
    const { title, description, body, tags } = req.body;
    const result = await useService.updateArticle(
      userId,
      articleId,
      title,
      description,
      body,
      tags
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  const userId = req.user.sub;
  const { articleId } = req.params;
  try {
    const result = await useService.deleteArticle(userId, articleId);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ mesage: error.message });
  }
};
