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

router.get('/getNotification', async function(req, res, next) {
    const { page, limit } = req.query
    res.status(200).json(await Notification.find({}, null, { skip: parseInt(page * limit) }).populate({
        path: "department",
    }).limit(parseInt(limit)))
});

router.get('/getNotificationByDepartment/:id', getNotificationById);
router.get('/getLengthNotification', getLengthNotification);
router.get('/getLengthNotification/:id', getLengthNotificationById);
router.post('/updateNotification/:id', updateNotifycationController);
router.post('/addNotification', addNotifycationController);
router.post('/deleteNotification/:id', deleteNotifycationController);
module.exports = router;