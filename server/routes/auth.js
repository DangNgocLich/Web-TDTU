var express = require('express');
var router = express.Router();
var passport = require('passport');
const { accessTokenSecret } = require('../middleware/AuthMiddleware');
const { generateToken } = require('../helpers/jwt.helper');
const User = require('../model/User');

const {
    loginController,
    regisController,
    changepassWordController,
    updateProfileController,
    checkToken,
    getUserByIDController,
    getUserByToken
} = require('../controllers/authController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

require('../config/passport')(passport);
router.use(passport.initialize());
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/register' }),
    async function (req, res) {
        const token = await generateToken(req.user, accessTokenSecret, '1d')
        res.cookie('accessToken', token, { maxAge: 900000, httpOnly: true })
        res.redirect('/');
    }
);
router.get('/getUser', async function (req, res) {
    res.status(200).json({ resultCode: -1, "message": "Lấy User Thành công", data: await User.find({}) })
})
router.post('/login', loginController)
router.use(AuthMiddleware.isAuth);
router.post('/register', regisController)
router.post('/updateProfile', updateProfileController)
router.post('/changepassword', changepassWordController)
router.post('/checkToken', checkToken)
router.post('/getUserByToken', getUserByToken)
router.post('/getUserByID', getUserByIDController)
module.exports = router