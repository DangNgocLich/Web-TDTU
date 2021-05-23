const Notification = require("../model/Notification");
const bcrypt = require('bcrypt');

const addNotifycationController = async (req, res) => {
    const { title, content, department } = req.body
    const uid = req.jwtDecoded.data.id
    if (!title || !content || !department) return res.status(400).json({ resultCode: -1, "message": "Vui Lòng Nhập Thông tin" })
    let body = {}
    body["uid"] = uid
    for (const key in req.body) {
        if (req.body[key]) {
            body[key] = req.body[key]
        }
    }
    console.log(body)
    var notificaltion = new Notification(body)
    notificaltion.save(function (err, notificaltion) {
        if (err) return console.error(err);
        res.status(200).json({ resultCode: 1, "message": "Đăng Nội Dung thành công", data: notificaltion._id },)
    });
}
const getNotificationById = async (req, res) => {
    const id = req.params.id
    const { page, limit } = req.query
    let data = await Notification.find({}, null, { skip: parseInt(page * limit) })
        .populate({
            path: "department",
            match: { _id: { $eq: id } }
        }).limit(parseInt(limit))
    return res.status(200).json({ resultCode: 1, data: data.filter((x) => x.department !== null) })
}
const getLengthNotification = async (req, res) => {
    let data = await Notification.countDocuments({}, null,).populate({
        path: "department",
        conut: true
    })
    return res.status(200).json({ resultCode: 1, data: data })
}
const getLengthNotificationById = async (req, res) => {
    const id = req.params.id
    let data = await Notification.find({}, null,)
        .populate({
            path: "department",
            match: { _id: { $eq: id } }
        })

    return res.status(200).json({ resultCode: 1, data: data.filter((x) => x.department !== null).length })
}
const updateNotifycationController = async (req, res) => {
    const { title, content, } = req.body
    const id = req.params.id
    let data = {}
    for (const key in req.body) {
        if (req.body[key]) {
            data[key] = req.body[key]
        }
    }
    if (!title || !content) return res.status(400).json({ resultCode: -1, "message": "Vui Lòng Nhập Thông tin" })
    await Notification.findOneAndUpdate({ _id: id }, data)
    return res.status(200).json({ resultCode: 1, "message": "Cập nhập thành công" },)
}
const deleteNotifycationController = async (req, res) => {
    const id = req.params.id
    await Notification.findByIdAndDelete({ _id: id })
    return res.status(200).json({ resultCode: 1, "message": "Xóa thành công" },)
}

module.exports = {
    addNotifycationController,
    updateNotifycationController,
    getNotificationById,
    deleteNotifycationController,
    getLengthNotification,
    getLengthNotificationById
}