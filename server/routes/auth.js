var express = require('express');
var router = express.Router();
var passport = require('passport');
const { accessTokenSecret } = require('../middleware/AuthMiddleware');
const { generateToken } = require('../helpers/jwt.helper');
const { loginController, regisController, changePasswordController } = require('../controllers/authController');
require('../config/passport')(passport);
router.use(passport.initialize());
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/register' }),
    async function (req, res) {
        const token = await generateToken(req.user, accessTokenSecret, '1d')
        res.cookie('accessToken',token, { maxAge: 900000, httpOnly: true })
        res.redirect('/');
    }
);

router.post('/login', loginController)
router.post('/register', regisController)
router.post('/changepassword', changePasswordController)


module.exports = router