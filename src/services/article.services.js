import { ErrorWithStatus } from '../Exception/error-with-status.exception.js';
import User from '../model/schema/user.schema.js';
import Article from '../model/schema/article.schema.js';

export const createArticle = async (author, title, description, body, tags) => {
  try {
    // Find the user by their ID
    const user = await User.findById(author);

    if (!user) {
      throw new ErrorWithStatus('User not found', 404);
    }

    // Create a new post object
    const article = new Article({
      author,
      title,
      description,
      body,
      tags,
    });

    await article.save();
    return {
      message: 'article created successfully',
      data: article,
    };
  } catch (error) {
    throw new ErrorWithStatus(error, 500);
  }
};

export const updateArticleState = async (userId, articleId, newState) => {
  try {
    // Find the article by its ID
    const article = await Article.findById(articleId);

    if (!article) {
      throw new ErrorWithStatus('Article not found', 404);
    }

    // Check if the user is the creator of the article
    if (article.author.toString() !== userId) {
      throw new ErrorWithStatus(
        'Unauthorized: Only the creator can update the article.',
        401
      );
    }

    // Update the state of the article
    article.state = newState;

    await article.save();

    return {
      message: 'Article state updated successfully',
      data: article,
    };
  } catch (error) {
    throw new ErrorWithStatus(error, 500);
  }
};
