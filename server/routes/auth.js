const express = require('express');
const session = require('express-session');
const passport = require('passport');
const authController = require('../controllers/authController');
require('../passportSetup');

const auth = express.Router();


//using passport to ask users to authenticate with google 
auth.get('/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
)); 

//callback for google to communicate after logging in 
auth.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:8080/',
    failureRedirect: '/auth/google/failure'
  })
);

//protected with auth, with loggedIn controller 
// auth.get('/', authController.isLoggedIn, (req, res) => {
//   res.send(`hello ${req.user.displayName}`);
//   console.log(req.user)
// });

//logout route 
auth.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

//failure to auth route 
auth.get('/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

module.exports = auth; 