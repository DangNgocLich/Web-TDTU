var express = require('express');
const {
    addNotifycationController,
    getNotificationById,
    updateNotifycationController,
    deleteNotifycationController
} = require('../controllers/notifycationController');
var router = express.Router();

const Notification = require('../model/Notification');

router.get('/getNotification', async function(req, res, next) {
    const { page, limit } = req.body
    res.status(200).json(await Notification.find({}, null, { skip: page * limit }).populate({
        path: "department",
        populate: {
            path: "department",
        }
    }).limit(limit))
});

router.get('/getNotificationByDepartment/:id', getNotificationById);
router.post('/updateNotification/:id', updateNotifycationController);
router.post('/addNotification', addNotifycationController);
router.post('/deleteNotification/:id', deleteNotifycationController);
module.exports = router;