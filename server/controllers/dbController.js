const db = require('../models/databaseModels');

const dbController = {};

dbController.getAll = (req, res, next) => {
  //  Create the query statement
  const query = 'SELECT * FROM test';

  //  Make query to the database, store the returning events in locals if query succeeds
  db.query(query)
      .then(response => {
          res.locals.test = response.rows;
          // console.log(response);
          next();
      })
      .catch(error => {
          console.log('error at dbController.getAll', error);
          return next({
              log: 'Express error handler caught in database middleware error',
              message: { err: 'An error occurred' }
          });
      });
}

module.exports = dbController;