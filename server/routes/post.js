var express = require('express');
const {
    addPostController,
    updatePostController,
    getPostByUserId,
    deletePostController,
    getPostController,
    getPostByIDController,
    deleteCommentController
} = require('../controllers/postController');
var router = express.Router();

const {Post} = require('../model/Post');

router.get('/getPost', getPostController);

router.get('/getPostByID', getPostByIDController);
router.post('/updatePost/:id', updatePostController);
router.post('/addPost', addPostController);
router.post('/deletePost/:id', deletePostController);
router.post('/deleteComment', deleteCommentController);
module.exports = router;