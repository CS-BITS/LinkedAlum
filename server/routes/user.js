const express = require('express');

const dbController = require('../controllers/dbController');

const router = express.Router();


//  handle create events request 
router.get('/', dbController.getAll,
    (req, res) => res.send(res.locals.test) );  //.sendStatus(200));

module.exports = router;