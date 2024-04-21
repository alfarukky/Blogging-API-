import * as useService from '../services/article.services.js';
export const createArticle = async (req, res) => {
  try {
    const author = req.user.sub;
    const { title, description, body, tags } = req.body;
    const result = await useService.createArticle(
      author,
      title,
      description,
      body,
      tags
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
