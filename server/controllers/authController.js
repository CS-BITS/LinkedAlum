const authController = {};

//check logged in status 
authController.isLoggedIn = (req, res, next) => {
  req.user ? res.redirect('/') : res.sendStatus(401);
}

module.exports = authController; 