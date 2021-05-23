var express = require('express');
var router = express.Router();
var passport = require('passport');
const { generateToken } = require('../helpers/jwt.helper');
const User = require('../model/User');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "lichbmtlqd@gmail.com";
const {
    loginController,
    regisController,
    changepassWordController,
    updateProfileController,
    checkToken,
    getUserByIDController,
    getUserByToken,
    getDepartmentUserByIDController
} = require('../controllers/authController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

require('../config/passport')(passport);
router.use(passport.initialize());
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '../../../fail' }),
    async function (req, res) {
        const token = await generateToken(req.user, accessTokenSecret, '30d')
        res.cookie('accessToken', token)
        res.cookie('uid', req.user.id)
        res.redirect('/');
    }
);

router.post('/login', loginController)
router.use(AuthMiddleware.isAuth);
router.get('/getUser', async function (req, res) {
    res.status(200).json({ resultCode: -1, "message": "Lấy User Thành công", data: await User.find({}).populate({ path: "department" }) })
})
router.post('/register', regisController)
router.post('/updateProfile', updateProfileController)
router.post('/changepassword', changepassWordController)
router.post('/checkToken', checkToken)
router.get('/getUserByToken', getUserByToken)
router.get('/getDepartmentUserByID', getDepartmentUserByIDController)
router.post('/getUserByID', getUserByIDController)
module.exports = router