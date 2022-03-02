const express = require('express');

const dbController = require('../controllers/dbController');

const router = express.Router();

// create an user
router.post('/', dbController.createUser,
    (req, res) => res.send(res.locals.test) );


module.exports = router;