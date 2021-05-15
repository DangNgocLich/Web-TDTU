const User = require("../model/User");
const bcrypt = require('bcrypt');

const loginController = async (req, res) => {
  const { userName, passWord } = req.body
  User.findOne({ 'userName': userName }, async function (err, user) {
    if (!user)
      return res.status(400).json({
        resultCode: -1,
        message: "Tài khoản không tồn tại vui lòng kiểm tra"
      })
    else {
      if (userName === "admin") {
        if (passWord === user.passWord) {
          accessToken = await jwtHelper.generateToken(userName, accessTokenSecret, "1d");
          return res.status(200).json({
            resultCode: 1,
            accessToken
          });
        } else
          return res.status(400).json({ resultCode: -1, "message": "Tài khoản hoặc mật khẩu sai vui lòng kiểm tra" })
      } else {
        bcrypt.compare(passWord, user.passWord).then(async result => {
          if (result) {
            accessToken = await jwtHelper.generateToken(userName, accessTokenSecret, "1d");
            return res.status(200).json({ accessToken });
          } else
            return res.status(400).json({ resultCode: -1, "message": "Tài khoản hoặc mật khẩu sai vui lòng kiểm tra" })
        })
      }
    }
  })
}

const regisController = async (req, res) => {
  const { userName, passWord } = req.body
  console.log(userName, passWord)
  if (!userName || !passWord) return res.status(400).json({ "messenge": "vui long nhap thong tin" })
  const data = await User.findOne({ 'userName': userName })
  console.log(data)
  if (data) {
    res.status(400).json({ resultCode: -1, "messenge": "User ton tai" })
  } else {
    bcrypt.hash(passWord, saltRounds).then(hash => {
      var user = new User({ userName: userName, passWord: hash })
      console.log(55555, user)
      user.save(function (err, user) {
        if (err) return console.error(err);
        console.log(user)
        res.status(200).json({ resultCode: 1, "messenge": "register thanh cong" },)
      });
    })
  }
}

const changePasswordController = async (req, res) => {
  // accessToken = await jwtHelper.generateToken();
  const { userName, passWord } = req.body
  console.log(userName, passWord)
  if (!userName || !passWord) return res.status(400).json({ resultCode: -1, "messenge": "vui long nhap thong tin" })
  const data = await User.findOneAndUpdate({ 'userName': userName }, { passWord: passWord })
  return res.status(200).json({ resultCode: 1, "message": "Đổi Mật khẩu thành công" })
}

module.exports = {
  loginController,
  regisController,
  changePasswordController
}