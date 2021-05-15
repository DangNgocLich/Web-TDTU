var express = require('express');
var router = express.Router();
const AuthMiddleWare = require("../middleware/AuthMiddleware");
//route
const authRoute = require('./auth')
const publicRoute = require('./public')
const adminRoute = require('./admin')

router.get('/', function(req, res, next) {
    res.status(200).json({message: "API WORKING"})
});

router.use('/auth',authRoute)
router.use('/public', publicRoute)
router.use('/admin', adminRoute)
router.use(AuthMiddleWare.isAuth);

module.exports = router;