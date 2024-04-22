import * as useService from '../services/article.services.js';
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
    res.json(result);
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
