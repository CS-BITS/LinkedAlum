const express = require('express');
const path = require('path');
const cors = require('cors');

const session = require('express-session');
const passport = require('passport');
require('./passportSetup');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serving static files
app.use(express.static(path.resolve(__dirname, '../client')));

//express session, intialize passport 
app.use(session({ secret: 'cat', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//  import  routers
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');

app.use('/test', userRouter);
app.use('/auth', authRouter);


//catches unknown routes 
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

//global error handler 
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

//listen to port 
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
