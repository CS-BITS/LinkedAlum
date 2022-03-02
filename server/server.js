const express = require('express');
const path = require('path');
const cors = require('cors');

const session = require('express-session');
const passport = require('passport');
require('./passportSetup');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

//middleware controller to check logged in status 
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serving static files
app.use(express.static(path.resolve(__dirname, '../client')));

//  import  routers
const userRouter = require('./routes/user');
app.use('/test', userRouter);


//express session, intialize passport 
app.use(session({ secret: 'cat', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//
app.get('/auth', (req, res) => {
  res.send('<a href="/google">Authenticate with Google</a>');
});

//using passport to ask users to authenticate with google 
app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

//callback for google to communicate after logging in 
app.get('/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/auth/protected',
    failureRedirect: '/auth/google/failure'
  })
);

//protected with auth, with loggedIn controller route 
app.get('/auth/protected', isLoggedIn, (req, res) => {
  const img = req.user.picture;
  res.send(`hello ${req.user.displayName}`);
  console.log(req.user)
});

//logout route 
app.get('/auth/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

//failure to auth route 
app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

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