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
