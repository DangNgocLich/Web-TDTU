const { Post, Comment } = require("../model/Post");
const bcrypt = require('bcrypt');
const addPostController = async (req, res) => {
    const { content } = req.body
    const uid = req.jwtDecoded.data.id
    if (!content) return res.status(400).json({ resultCode: -1, "message": "Vui Lòng Nhập Thông tin" })
    var post = new Post({ user: uid, content })
    return post.save(function (err, post) {
        if (err) return res.status(500).json({ resultCode: 1, "message": "Lỗi server" });
        post.populate('user', (err, newPost) => {
            if (err) return res.status(500).json({ resultCode: 1, "message": "Lỗi server" });
            return res.status(200).json({ resultCode: 1, "message": "Đăng nội dung thành công", data: newPost })
        })
    });
}
const getPostController = async function (req, res, next) {
    const { page, limit, limitComment } = req.query
    res.status(200).json({
        resultCode: 1,
        data: await Post.find({}, null, { skip: Number(page) * Number(limit), limit: Number(limit), sort: { 'createdAt': -1 } }).populate(['user',
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
        let data = await Post.find({}, null, { skip: Number(page) * Number(limit), limit: Number(limit), sort: { 'createdAt': -1 } })
            .populate([{
                path: "user",
                match: { _id: { $eq: id } }
            }, { path: 'comment', populate: 'by', limit: limitComment }]).limit(parseInt(limit))
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
    await Post.findOneAndUpdate({ _id: id }, data).then(post => {
        if (post) {
            const { io } = require('../app')
            console.log(post)
            io.emit("onCommentDelete", {
                postID: post.postID
            })
            return res.status(200).json({ resultCode: 1, "message": "Cập nhập thành công" })
        }
    })
    // return res.status(200).json({ resultCode: 1, "message": "Cập nhập thành công" },)
}
const deletePostController = async (req, res) => {
    const id = req.params.id
    console.log(id)
    await Post.findByIdAndDelete({ _id: id }).then(post => {
        if (post) {
            const { io } = require('../app')
            console.log(post)
            io.emit("onCommentDelete", {
                postID: post.postID
            })
            return res.status(200).json({ resultCode: 1, "message": "Xóa thành công" })
        }
        return res.status(200).json({ resultCode: -1, "message": "Không thể xóa" })
    })
}

const deleteCommentController = async (req, res) => {
    const uid = req.params.id
    const { id } = req.body
    Comment.findByIdAndDelete({ _id: id, by: uid }).then(comment => {
        if (comment) {
            const { io } = require('../app')
            io.emit("onCommentDelete", {
                postID: comment.postID
            })
            return res.status(200).json({ resultCode: 1, "message": "Xóa thành công" })
        }
        return res.status(200).json({ resultCode: -1, "message": "Không thể xóa" })
    })
}

module.exports = {
    addPostController,
    updatePostController,
    getPostByUserId,
    deletePostController,
    getPostController,
    getPostByIDController,
    deleteCommentController
}