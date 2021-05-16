const { Post } = require("../model/Post");
const bcrypt = require('bcrypt');

const addPostController = async (req, res) => {
    const { user, content } = req.body
    if (!user || !content) return res.status(400).json({ resultCode: -1, "message": "Vui Lòng Nhập Thông tin" })
    let body = {}
    for (const key in req.body) {
        if (req.body[key]) {
            body[key] = req.body[key]
        }
    }
    var post = new Post(body)
    post.save(function (err, post) {
        if (err) return console.error(err);
        res.status(200).json({ resultCode: 1, "message": "Đăng Nội Dung thành công" },)
    });
}
const getPostController = async function (req, res, next) {
    const { page, limit, limitComment } = req.query
    res.status(200).json({
        resultCode: 1,
        data: await Post.find({}, null, { skip: Number(page) * Number(limit), limit: Number(limit) }).populate(['user',
            { path: 'comment', populate: 'by', limit: limitComment, options: { sort: { 'createdAt': -1 } } }])
    })
    // , options: { sort: { 'createdAt': -1 } }
}
const getPostByIDController = async function (req, res, next) {
    const { id, limitComment } = req.query
    res.status(200).json({
        resultCode: 1,
        data: await Post.findById(id).populate(['user', { path: 'comment', populate: 'by', limit: limitComment, options: { sort: { 'createdAt': -1 } } }])
    })
}
const getPostByUserId = async (req, res) => {
    const id = req.params.id
    const { page, limit, limitComment } = req.query
    try {
        let data = await Post.find({}, null, { skip: Number(page) * Number(limit), limit: Number(limit), options: { sort: { 'createdAt': -1 } } })
            .populate([{
                path: "user",
                match: { _id: { $eq: id } }
            },{ path: 'comment', populate: 'by', limit: limitComment }]).limit(parseInt(limit))
        return res.status(200).json({ resultCode: 1, data: data.filter((x) => x.department !== null) })
    } catch (error) {
        return res.status(400).json({ resultCode: -1, "message": "Kiểm tra id" })
    }
}
const updatePostController = async (req, res) => {
    const { content, } = req.body
    const id = req.params.id
    let data = {}
    for (const key in req.body) {
        if (req.body[key]) {
            data[key] = req.body[key]
        }
    }
    if (!content) return res.status(400).json({ resultCode: -1, "message": "Vui Lòng Nhập Thông tin" })
    await Post.findOneAndUpdate({ _id: id }, data)
    return res.status(200).json({ resultCode: 1, "message": "Cập nhập thành công" },)
}
const deletePostController = async (req, res) => {
    const id = req.params.id
    await Post.findByIdAndDelete({ _id: id })
    return res.status(200).json({ resultCode: 1, "message": "Xóa thành công" },)
}

module.exports = {
    addPostController,
    updatePostController,
    getPostByUserId,
    deletePostController,
    getPostController,
    getPostByIDController
}