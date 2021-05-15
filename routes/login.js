var express = require('express');
const User = require('../model/User');
var router = express.Router();
var passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwtHelper = require("../helpers/jwt.helper");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "lichbmtlqd@gmail.com";
router.use(passport.initialize());
router.use(passport.session());
require('../config/passport')(passport)
    /* GET login listing. */
router.get('/', function(req, res, next) {
    res.render("login")
});
router.get('/register', async(req, res, next) => {
    res.render("singin")
})
router.post('/register', async(req, res, next) => {
    // accessToken = await jwtHelper.generateToken();
    const { userName, passWord } = req.body
    console.log(userName, passWord)
    if (!userName || !passWord) return res.status(400).json({ "messenge": "vui long nhap thong tin" })
    const data = await User.findOne({ 'userName': userName })
    console.log(data)
    if (data) {
        res.status(400).json({ "messenge": "User ton tai" })
    } else {
        bcrypt.hash(passWord, saltRounds).then(hash => {
            var user = new User({ userName: userName, passWord: hash })
            console.log(55555, user)
            user.save(function(err, user) {
                if (err) return console.error(err);
                console.log(user)
                res.status(200).json({ "messenge": "register thanh cong" }, )
            });
        })

    }

})


router.post('/', async(req, res, next) => {
    const { userName, passWord } = req.body
    User.findOne({ 'userName': userName }, async function(err, user) {
        if (!user)
            return res.status(400).json({ "message": "Tài khoản không tồn tại vui lòng kiểm tra" })
        else {
            if (userName === "admin") {
                if (passWord === user.passWord) {
                    accessToken = await jwtHelper.generateToken(userName, accessTokenSecret, "1d");
                    return res.status(200).json({ accessToken });
                } else
                    return res.status(400).json({ "message": "Tài khoản hoặc mật khẩu sai vui lòng kiểm tra" })
            } else {
                bcrypt.compare(passWord, user.passWord).then(async result => {
                    if (result) {
                        accessToken = await jwtHelper.generateToken(userName, accessTokenSecret, "1d");
                        return res.status(200).json({ accessToken });
                    } else
                        return res.status(400).json({ "message": "Tài khoản hoặc mật khẩu sai vui lòng kiểm tra" })

                })
            }
        }


    })

})


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login/failed' }),
    function(req, res) {
        // Successful authentication, redirect home.
        console.log(req.data)
        res.redirect('/');
    }
);

router.get('/failed', (req, res) => {
    res.end("vui long dang nhap lai")
})
module.exports = router;