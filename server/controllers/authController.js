const User = require("../model/User");
const bcrypt = require('bcrypt');

const loginController = async(req, res) => {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ "messenge": "vui long nhap thong tin" })
    User.findOne({ 'username': username }, async function(err, user) {
        if (!user)
            return res.status(400).json({
                resultCode: -1,
                message: "Tài khoản không tồn tại vui lòng kiểm tra"
            })
        else {
            if (username === "admin") {
                if (password === user.password) {
                    accessToken = await jwtHelper.generateToken(username, accessTokenSecret, "1d");
                    return res.status(200).json({
                        resultCode: 1,
                        accessToken
                    });
                } else
                    return res.status(400).json({ resultCode: -1, "message": "Tài khoản hoặc mật khẩu sai vui lòng kiểm tra" })
            } else {
                bcrypt.compare(password, user.password).then(async result => {
                    if (result) {
                        accessToken = await jwtHelper.generateToken(username, accessTokenSecret, "1d");
                        return res.status(200).json({ accessToken });
                    } else
                        return res.status(400).json({ resultCode: -1, "message": "Tài khoản hoặc mật khẩu sai vui lòng kiểm tra" })
                })
            }
        }
    })
}

const regisController = async(req, res) => {
    const { username, password } = req.body
    let body = {}
    for (const key in req.body) {
        if (req.body[key]) {
            body[key] = req.body[key]
        }
    }
    if (!username || !password) return res.status(400).json({ "messenge": "vui long nhap thong tin" })
    const data = await User.findOne({ 'username': username })
    if (data) {
        res.status(400).json({ resultCode: -1, "messenge": "User ton tai" })
    } else {
        bcrypt.hash(password, saltRounds).then(hash => {
            body[password] = hash
            body[Role] = "2"
            var user = new User(body)
            console.log(55555, user)
            user.save(function(err, user) {
                if (err) return console.error(err);
                console.log(user)
                res.status(200).json({ resultCode: 1, "messenge": "register thành công" }, )
            });
        })
    }
}

const updateProfileController = async(req, res) => {
    const { username } = req.body
    let data = {}
    for (const key in req.body) {
        if (req.body[key]) {
            data[key] = req.body[key]
        }
    }
    if (!username) return res.status(400).json({ "messenge": "vui long nhap thong tin" })
    await User.findOneAndUpdate({ username: username }, data)
    return res.status(200).json({ resultCode: 1, "messenge": "register thành công" }, )
}


const changepassWordController = async(req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    if (!username || !password) return res.status(400).json({ resultCode: -1, "messenge": "vui long nhap thong tin" })
    const data = await User.findOneAndUpdate({ 'username': username }, { password: password })
    return res.status(200).json({ resultCode: 1, "message": "Đổi Mật khẩu thành công" })
}

module.exports = {
    loginController,
    regisController,
    changepassWordController,
    updateProfileController
}