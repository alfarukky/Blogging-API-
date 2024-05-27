import { ErrorWithStatus } from '../Exception/error-with-status.exception.js';
import User from '../model/schema/user.schema.js';
import Article from '../model/schema/article.schema.js';
import { calculateReadingTime } from '../utils/readingTime.utils.js';
import { getRedisClient } from '../model/connection.js';

const EXPIRATION_TIME = 3600;

export const getArticles = async (
  page,
  limit,
  author,
  title,
  tags,
  sortBy,
  sortOrder,
  originalUrl
) => {
  try {
    const query = { state: 'published' };
    if (author) query.author = author;
    if (title) query.title = { $regex: title, $options: 'i' }; // Case-insensitive search
    if (tags) query.tags = { $in: tags.split(',') };

    // Build sort object for ordering
    let sort = {};
    if (sortBy && sortOrder) {
      sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    } else {
      sort = { createdAt: -1 }; // Default sorting by timestamp in descending order
    }

    // Execute query with pagination and sorting
    const publishedArticles = await Article.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const client = getRedisClient();
    client.setEx(
      originalUrl,
      EXPIRATION_TIME,
      JSON.stringify(publishedArticles)
    );

    return {
      message: 'List of published articles',
      data: publishedArticles,
    };
  } catch (error) {
    throw new ErrorWithStatus(error, 500);
  }
};

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

export const getOneArticle = async (articleId, originalUrl) => {
  try {
    // Find the article by its ID
    const article = await Article.findOne({
      _id: articleId,
      state: 'published',
    });

    if (!article) {
      throw new ErrorWithStatus('Article not found', 404);
    }

    // Calculate reading time
    const readingTime = calculateReadingTime(article.body);
    // Update the reading_time field in the article schema
    article.reading_time = readingTime;
    //Increment the read_count of the article by 1
    article.read_count += 1;
    await article.save();

    // Find the user(author) of the article
    const author = await User.findById(article.author).select('-password');

    if (!author) {
      throw new ErrorWithStatus('Author not found', 404);
    }

    const client = getRedisClient();
    client.setEx(originalUrl, EXPIRATION_TIME, JSON.stringify(article));
    return {
      message: 'sucessful',
      data: {
        article,
        author,
      },
    };
  } catch (error) {
    throw new ErrorWithStatus(error, 500);
  }
};
export const getOwnersArticle = async (
  userId,
  page,
  limit,
  state,
  originalUrl
) => {
  try {
    const query = { author: userId };
    if (state) query.state = state;
    // Execute query with pagination
    const articles = await Article.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const client = getRedisClient();
    client.setEx(originalUrl, EXPIRATION_TIME, JSON.stringify(articles));
    return {
      message: 'sucessful',
      data: articles,
    };
  } catch (error) {
    throw new ErrorWithStatus(error, 500);
  }
};

export const updateArticle = async (
  userId,
  articleId,
  title,
  description,
  body,
  tags
) => {
  try {
    const article = await Article.findOne({ _id: articleId, author: userId });
    if (!article) {
      throw new ErrorWithStatus(
        'Article not found or you are not authorized to edit it',
        404
      );
    }
    // Update the article
    article.title = title;
    article.description = description;
    article.body = body;
    article.tags = tags;

    await article.save();
    return {
      message: 'Article updated sucessfully',
      data: article,
    };
  } catch (error) {
    throw new ErrorWithStatus(error, 500);
  }
};

export const deleteArticle = async (userId, articleId) => {
  try {
    const article = await Article.findOne({ _id: articleId, author: userId });
    if (!article) {
      throw new ErrorWithStatus(
        'Article not found or you are not authorized to delete it',
        404
      );
    }
    await article.deleteOne();
    return {
      message: 'article deleted sucessfully',
      data: article,
    };
  } catch (error) {
    throw new ErrorWithStatus(error, 500);
  }
};
