const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

//  import  routers
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// serving static files
app.use(express.static(path.resolve(__dirname, '../client')));
app.use(cors({
  origin: '*'
}));

// Apply routers to path
app.use('/user', userRouter);
app.use('/api', apiRouter);

//  Handle all unknown request
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

//  Global Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 404,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//  listen to PORT
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;