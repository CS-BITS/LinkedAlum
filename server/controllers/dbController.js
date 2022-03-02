const { rows } = require('pg/lib/defaults');
const db = require('../models/databaseModels');

const dbController = {};

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////        USER           ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

dbController.getUser = (req, res, next) => {
  //  Create the query statement
  const query = 'SELECT * FROM "user" WHERE user_id=' + req.params.id;

  db.query(query)
    .then((response) => {
      res.locals.test = response.rows;
      next();
    })
    .catch((error) => {
      console.log('error at dbController.getUser', error);
      return next({
        log: 'Express error handler caught in database middleware error',
        message: { err: 'An error occurred' },
      });
    });
};

dbController.createUser = async (req, res, next) => {
  try {
    //  Create the query statement
    const query =
      'INSERT INTO "user" (user_name, password, first_name, last_name, email_address) VALUES ($1, $2, $3, $4, $5);';
    data = ['Harry123', 'password', 'Harry', 'Potter', 'harrypotter@gmail.com'];

    const response = await db.query(query, data);
    console.log('User added with ID:', response.rows);

    next();
  } catch (error) {
    console.log(error);
    next({
      log: 'Express error handler caught in dbController.createUser error',
      message: { err: 'An error occurred' },
    });
  }
};

dbController.updateUser = (req, res, next) => {};

dbController.deleteUser = (req, res, next) => {};

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////        POSTS          ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

dbController.getAllPostsWithComments = async (req, res, next) => {
  //  Create the query statement
  try {
    const postQuery =
      'SELECT post_id, message, likes, posts.created_at, "user".user_name FROM posts INNER JOIN "user" ON posts.user_id = "user".user_id ORDER BY posts.created_at DESC';
    const responseObject = [];

    const response = await db.query(postQuery);
    const posts = response.rows;
    for (let i = 0; i < posts.length; i++) {
      let temp = {};
      temp.post_id = posts[i].post_id;
      temp.created_at = posts[i].created_at;
      temp.message = posts[i].message;
      temp.likes = posts[i].likes;
      temp.user_name = posts[i].user_name;

      try {
        const commentsQuery =
          'SELECT comment_id, message, comments.created_at, "user".user_name FROM comments INNER JOIN "user" ON comments.user_id = "user".user_id WHERE post_id=' +
          posts[i].post_id;
        const resp = await db.query(commentsQuery);
        temp.comments = resp.rows;
      } catch {
        console.log(error);
        next({
          log: 'Express error handler caught in dbController.getAllPostsWithComments error',
          message: { err: 'An error occurred' },
        });
      }
      responseObject.push(temp);
      res.locals.data = responseObject;
    }
    next();
  } catch (error) {
    console.log(error);
    next({
      log: 'Express error handler caught in dbController.getAllPostsWithComments error',
      message: { err: 'An error occurred' },
    });
  }
};

dbController.createPost = async (req, res, next) => {
  const data = [req.body.user_id, 0, req.body.message];
  try {
    //  Create the query statement
    const query =
      'INSERT INTO "posts" (user_id, likes, message) VALUES ($1, $2, $3) RETURNING post_id;';

    const response = await db.query(query, data);
    console.log('Post added with ID:', response.rows);

    next();
  } catch (error) {
    console.log(error);
    next({
      log: 'Express error handler caught in dbController.createPost error',
      message: { err: 'An error occurred' },
    });
  }
};

dbController.updatePostMessage = async (req, res, next) => {
  try {
    //  Create the query statement
    const query =
      "UPDATE posts SET message = '" +
      req.body.message +
      "' WHERE post_id=" +
      req.body.post_id;
    const response = await db.query(query);

    next();
  } catch (error) {
    console.log(error);
    next({
      log: 'Express error handler caught in dbController.updatePostMessage error',
      message: { err: 'An error occurred' },
    });
  }
};

dbController.updatePostLikes = async (req, res, next) => {
  try {
    //  Create the query statement
    const query = 'SELECT likes FROM posts WHERE post_id=' + req.params.id;

    const response = await db.query(query);
    const likes = response.rows[0].likes + 1;

    try {
      const updateLikes =
        'UPDATE posts SET likes = ' + likes + ' WHERE post_id=' + req.params.id;
      const resp = await db.query(updateLikes);
    } catch {
      console.log(error);
      next({
        log: 'Express error handler caught in dbController.updatePostLikes error',
        message: { err: 'An error occurred' },
      });
    }
    next();
  } catch (error) {
    console.log(error);
    next({
      log: 'Express error handler caught in dbController.updatePostLikes error',
      message: { err: 'An error occurred' },
    });
  }
};

dbController.deletePost = async (req, res, next) => {
  try {
    //  Create the query statement
    const query = 'DELETE FROM posts WHERE post_id=' + req.params.id;

    const response = await db.query(query);
    console.log('Post deleted. Number of rows deleted:', response.rowCount);

    next();
  } catch (error) {
    console.log(error);
    next({
      log: 'Express error handler caught in dbController.deletePost error',
      message: { err: 'An error occurred' },
    });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////        COMMENTS       ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
dbController.getAllComments = (req, res, next) => {
  //  Create the query statement
  const query = 'SELECT * FROM comments';

  db.query(query)
    .then((response) => {
      res.locals.comments = response.rows;
      next();
    })
    .catch((error) => {
      console.log('error at dbController.getAllComments', error);
      return next({
        log: 'Express error handler caught in database middleware error',
        message: { err: 'An error occurred' },
      });
    });
};

dbController.createComment = async (req, res, next) => {
  const data = [req.body.post_id, req.body.user_id, req.body.message];
  try {
    //  Create the query statement
    const query =
      'INSERT INTO comments (post_id, user_id, message) VALUES ($1, $2, $3) RETURNING comment_id;';

    const response = await db.query(query, data);
    console.log('Comment added with ID:', response.rows);

    next();
  } catch (error) {
    console.log(error);
    next({
      log: 'Express error handler caught in dbController.createComment error',
      message: { err: 'An error occurred' },
    });
  }
};

dbController.updateComment = async (req, res, next) => {
  try {
    //  Create the query statement
    const query =
      "UPDATE comments SET message = '" +
      req.body.message +
      "' WHERE comment_id=" +
      req.body.comment_id;
    const response = await db.query(query);

    next();
  } catch (error) {
    console.log(error);
    next({
      log: 'Express error handler caught in dbController.updateComment error',
      message: { err: 'An error occurred' },
    });
  }
};

dbController.deleteComment = async (req, res, next) => {
  try {
    //  Create the query statement
    const query = 'DELETE FROM comments WHERE comment_id=' + req.params.id;

    const response = await db.query(query);
    console.log('Comment deleted. Number of rows deleted:', response.rowCount);

    next();
  } catch (error) {
    console.log(error);
    next({
      log: 'Express error handler caught in dbController.deleteComment error',
      message: { err: 'An error occurred' },
    });
  }
};

module.exports = dbController;
