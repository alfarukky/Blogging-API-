# ALtSchool Africa - Web Development Training (NodeJS)

## Table of contents

- [Overview](#overview)
  - [Built with](#built-with)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

**User Management:**
1- Users have attributes including first name, last name, email, and password.
2- Sign up and sign in functionalities are provided.
3- JWT authentication strategy is implemented with a token expiration of 1 hour.

**Blog Management:**
1- Blogs can be in draft or published states.
2- Owners have full control over their blogs, including editing, publishing, and deleting.
3- Users can create blogs, with drafts being the initial state upon creation.

**API Functionality:**
1- Endpoint for listing published blogs is available for both logged in and not logged in users.
2- Endpoint for retrieving a single published blog is provided for all users.
3- Pagination, filtering by state, searching by author, title, and tags, and ordering by read count, reading time, and timestamp are supported.

**Additional Features:**
1- Reading time of blogs is calculated using a custom algorithm.
2- Read count of blogs is updated when accessed.
3- Tests are implemented for all endpoints to ensure reliability and functionality.
4- Logging is done using Winston to capture functions and processes.

**Entity Relationship Diagram (ERD):**
An ERD is created to illustrate the relationships between entities such as users and blogs.

### Built with

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **Bcrypt.js**
- **dotenv**
- **Joi**
- **winston**
- **Testing Framework(jest)**
- **JWT (JSON Web Tokens)**

## Author

- Github Profile - [@alfarukky](https://github.com/alfarukky)

## Acknowledgments

I express my sincere gratitude to _@altschoolafrica_ and to our mentor _@elTobiloba_
