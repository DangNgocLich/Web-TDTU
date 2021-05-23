const express = require('express')
const next = require('next')
const mongodb = require('./mongo');
const path = require('path');
const cors = require('cors');
const socketio = require('socket.io')

const port = process.env.PORT || 5000;
const dev = process.env.NODE_ENV !== 'production'
const appNext = next({ dev })
const handle = appNext.getRequestHandler()

const route = require('./routes/index')

const app = express()
mongodb
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use('/api', route)

app.get('*', (req, res) => {
    return handle(req, res)
})

const httpServer = app.listen(port, (err) => {
    if (err) throw err
    console.log('> Server listening on port:', port)
})



const { Comment, Post } = require('./model/Post')
const io = socketio(httpServer)
io.on('connection', (socket) => {
    let addedUser = false;
    console.log("Client connected")

    // when the client emits 'new message', this listens and executes
    socket.on('new message', (data) => {
        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });
    });

    socket.on('onComment', (data) => {
        const { postID, uid, content } = data
        if (!postID || !uid || !content) return
        Comment.create({ by: uid, content, postID }).then(comment => {
            Post.findById(postID).then(post => {
                post.comment.push(comment._id)
                post.save().then(result => {
                    io.emit("commentSuccess", {
                        postID: postID
                    })
                })
            })
        })
    });
    socket.on('onUpdate', (data) => {
        const { cmId, content, postID } = data
        if (!cmId || !content || !postID) return
        console.log(cmId)
        Comment.findOneAndUpdate({ _id: cmId }, { content }).then(comment => {
            io.emit("commentSuccess", {
                postID: postID
            })
        })
    });
    socket.on('onPost', (data) => {
        const { postID, uid, title } = data
        console.log(123213, data)
        if (!(postID || uid || title)) return
        Post.findById(postID).populate({ path: "deparment" }).then((result) =>
            io.emit("postSuccess", {
                // postID: postID,
                // title: title,
                // deparment: result.deparment.label
            }))

    });
})
appNext.prepare()

module.exports = {
    io
}