var express = require('express');
const {
    addNotifycationController,
    getNotificationById,
    updateNotifycationController,
    deleteNotifycationController
} = require('../controllers/notifycationController');
var router = express.Router();

const Post = require('../model/Post');

router.get('/getPost', async function(req, res, next) {
    const { page, limit } = req.body
    res.status(200).json(await Post.find({}, null, { skip: page * limit }).populate({
        path: "User",
    }).limit(limit))
});

router.get('/getPost/:id', getNotificationById);
router.post('/updateNotification/:id', updateNotifycationController);
router.post('/addNotification', addNotifycationController);
router.post('/deleteNotification/:id', deleteNotifycationController);
module.exports = router;