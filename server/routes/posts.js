const express = require('express');

const dbController = require('../controllers/dbController');

const router = express.Router();


//  get all posts 
router.get('/', dbController.getAllPostsWithComments,
    (req, res) => res.send(res.locals.data) ); 

// create a post
router.post('/', dbController.createPost,
    (req, res) => res.send(res.locals.test) );

// edit a post
router.put('/', dbController.updatePostMessage,
    (req, res) => res.send(res.locals.test) );

// increase likes by 1
router.put('/:id', dbController.updatePostLikes,
    (req, res) => res.send(res.locals.test) );

// delete a post
router.delete('/:id', dbController.deletePost,
    (req, res) => res.send(res.locals.test) );

module.exports = router;