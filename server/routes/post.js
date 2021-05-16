var express = require('express');
const {
    addPostController,
    updatePostController,
    getPostByUserId,
    deletePostController
} = require('../controllers/postController');
var router = express.Router();

const Post = require('../model/Post');

router.get('/getPost', async function (req, res, next) {
    const { page, limit } = req.query
    res.status(200).json({
        resultCode: 1,
        data: await Post.find({}, null, { skip: parseInt(page * limit) }).populate({
            path: "user",
        }).limit(parseInt(limit))
    })
});

router.get('/getPost/:id', getPostByUserId);
router.post('/updatePost/:id', updatePostController);
router.post('/addPost', addPostController);
router.post('/deletePost/:id', deletePostController);
module.exports = router;