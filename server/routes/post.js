var express = require('express');
const {
    addPostController,
    updatePostController,
    getPostByUserId,
    deletePostController
} = require('../controllers/postController');
var router = express.Router();

const Post = require('../model/Post');

router.get('/getPost', async function(req, res, next) {
    const { page, limit } = req.body
    res.status(200).json(await Post.find({}, null, { skip: page * limit }).populate({
        path: "User",
    }).limit(limit))
});

router.get('/getPost/:id', getPostByUserId);
router.post('/updatePost/:id', updatePostController);
router.post('/addPost', addPostController);
router.post('/deletePost/:id', deletePostController);
module.exports = router;