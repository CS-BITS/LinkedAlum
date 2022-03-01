const express = require('express');
const path = require('path');
const cors = require('cors');

const session = require('express-session');
const passport = require('passport');
require('./passportSetup');

const app = express();
const PORT = process.env.PORT || 3000;

//  import  routers
const userRouter = require('./routes/user');
app.use('/test', userRouter);

// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serving static files
// app.use(express.static(path.resolve(__dirname, '../client')));
// app.use(cors({
//   origin: '*'
// }));

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'cat', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('<a href="/google">Authenticate with Google</a>');
});

app.get('/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

app.get('/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/protected',
    failureRedirect: '/google/failure'
  })
);

app.get('/protected', isLoggedIn, (req, res) => {
  const img = req.user.picture;
  res.send('');
  console.log(req.user)
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

app.get('/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

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

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});