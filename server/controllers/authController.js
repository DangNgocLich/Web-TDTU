const User = require("../model/User");
const bcrypt = require('bcrypt');
const { generateToken } = require("../helpers/jwt.helper");
const { accessTokenSecret } = require('../middleware/AuthMiddleware');
const jwtHelper = require("../helpers/jwt.helper");
const saltRounds = 10;
const loginController = async (req, res) => {

    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ resultCode: -1, "message": "Vui Lòng Nhập Thông tin" })
    User.findOne({ 'username': username }, async function (err, user) {
        if (!user)
            return res.status(400).json({
                resultCode: -1,
                message: "Tài khoản không tồn tại vui lòng kiểm tra"
            })

        else {
            bcrypt.compare(password, user.password).then(async result => {
                if (result) {
                    accessToken = await generateToken({ _id: user._id, role: user.role }, accessTokenSecret, "1d");
                    return res.status(200).json({ resultCode: 1, accessToken });
                } else
                    return res.status(400).json({ resultCode: -1, "message": "Tài khoản hoặc mật khẩu sai vui lòng kiểm tra" })
            })
        }
    }).select('+password')
}

const regisController = async (req, res) => {
    const { username, password, displayName } = req.body
    if (!username || !password || !displayName || req.jwtDecoded.data.role !== "3") return res.status(400).json({ resultCode: -1, "message": "Vui Lòng Nhập Thông tin" })
    return User.find({ username }).then(user => {
        if (user.length > 0) return res.status(400).json({ resultCode: -1, "message": "Tài Khoản Đã Tồn Tại" })
        bcrypt.hash(password, saltRounds).then(hash => { return User.create({ username, password: hash, displayName, role: "2" }).then(newUser => res.status(200).json({ resultCode: 1, "message": "Đăng Ký Thành Công" })) })
    }).catch(err => {
        console.log(err);
        return res.status(500).json({ resultCode: -1, "message": "Lỗi Sever" })
    })
}

const getUserByIDController = async (req, res) => {

    const { _id } = req.body
    if (!_id) return res.status(400).json({ resultCode: -1, "message": "Vui Lòng Nhập Thông tin" })
    return User.findById(_id).populate('user', '-password').then(user => {

        if (user.length < 0) return res.status(400).json({ resultCode: -1, "message": "Tài Khoản Không tồn tại" })
        else return res.status(400).json({ resultCode: -1, "message": "Lấy User Thành công", data: user })
    }).catch(err => {
        console.log(err);
        return res.status(500).json({ resultCode: -1, "message": "Lỗi Sever" })
    })
}



const updateProfileController = async (req, res) => {
    const { username } = req.body
    let data = {}
    for (const key in req.body) {
        if (req.body[key]) {
            data[key] = req.body[key]
        }
    }
    if (!username) return res.status(400).json({ resultCode: -1, "message": "Vui Lòng Nhập Thông tin" })
    await User.findOneAndUpdate({ username: username }, data)
    return res.status(200).json({ resultCode: 1, "message": "Cập Nhập thành công" },)
}


const changepassWordController = async (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    if (!username || !password) return res.status(400).json({ resultCode: -1, "message": "Vui Lòng Nhập Thông tin" })
    const data = await User.findOneAndUpdate({ 'username': username }, { password: password })
    return res.status(200).json({ resultCode: 1, "message": "Đổi Mật khẩu thành công" })
}

const checkToken = async (req, res) => {
    const tokenFromClient = req.body.token
    if (tokenFromClient) {
        // Nếu tồn tại token
        try {
            // Thực hiện giải mã token xem có hợp lệ hay không?
            const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);

            // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
            req.jwtDecoded = decoded;
            return res.status(200).json({ resultCode: 1, })
            // Cho phép req đi tiếp sang controller.
        } catch (error) {
            // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
            // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
            return res.status(400).json({ resultCode: -1, })
        }
    } else {
        // Không tìm thấy token trong request
        return res.status(400).json({ resultCode: -1, })
    }
}

const getUserByToken = async (req, res) => {
    const tokenFromClient = req.jwtDecoded
    if (tokenFromClient) {
        return res.status(200).json({ resultCode: 1, data: await User.findById(tokenFromClient.data.id), "message": "Lấy thành công" })
    } else {
        // Không tìm thấy token trong request
        return res.status(400).json({ resultCode: -1, "message": "Thất bại" })
    }
}
module.exports = {
    loginController,
    regisController,
    changepassWordController,
    updateProfileController,
    checkToken,
    getUserByIDController,
    getUserByToken
}