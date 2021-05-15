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
    res.status(200).json(await Notification.find({}).populate({
        path: "department",
        populate: {
            path: "department",
        }
    }))
});

router.get('/getNotificationByDepartment/:id', getNotificationById);
router.post('/updateNotification/:id', updateNotifycationController);
router.post('/addNotification', addNotifycationController);
router.post('/deleteNotification/:id', deleteNotifycationController);
module.exports = router;