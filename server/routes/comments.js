const express = require('express');

const dbController = require('../controllers/dbController');

const router = express.Router();


//  get all comments 
router.get('/', dbController.getAllComments,
    (req, res) => res.send(res.locals.comments) ); 

// create a comment
router.post('/', dbController.createComment,
    (req, res) => res.send(res.locals.test) );

// edit a comment
router.put('/', dbController.updateComment,
    (req, res) => res.send(res.locals.test) );

// delete a comment
router.delete('/:id', dbController.deleteComment,
    (req, res) => res.send(res.locals.test) );

module.exports = router;