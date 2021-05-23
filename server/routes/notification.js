var express = require('express');
const {
    addNotifycationController,
    getNotificationById,
    updateNotifycationController,
    deleteNotifycationController,
    getLengthNotification,
    getLengthNotificationById
} = require('../controllers/notifycationController');
var router = express.Router();

const Notification = require('../model/Notification');

router.get('/getNotification', async function (req, res, next) {
    const _id = req.params.id
    const { page, limit } = req.query
    res.status(200).json({
        resultCode: 1, data: await Notification.find({}, null, { skip: parseInt(page * limit) }).populate({
            path: "department",
        }).populate({
            path: "uid",
        }).limit(parseInt(limit)).sort({ updatedAt: -1 })
    })
});

router.get('/getNotificationByDepartment/:id', getNotificationById);
router.get('/getNotification/:id', async function (req, res, next) {
    const _id = req.params.id
    res.status(200).json({
        resultCode: 1, data: await Notification.findOne({ _id }, null,).populate({
            path: "department",
        })
    })
});

router.get('/getLengthNotification', getLengthNotification);
router.get('/getLengthNotification/:id', getLengthNotificationById);
router.post('/updateNotification/:id', updateNotifycationController);
router.post('/addNotification', addNotifycationController);
router.post('/deleteNotification/:id', deleteNotifycationController);
module.exports = router;