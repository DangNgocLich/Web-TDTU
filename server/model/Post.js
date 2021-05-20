//Require Mongoose
const { now } = require('mongoose');
var mongoose = require('mongoose');

//Định nghĩa một schema
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    like: { type: Number },
    comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    picture: { type: String, },
    linkvideo: { type: String, },
}, { timestamps: true });
var Post = mongoose.model('Post', PostSchema, 'Post');

var CommentSchema = new Schema({
    by: { type: Schema.Types.ObjectId, ref: 'User' },
    postID: { type: Schema.Types.ObjectId, ref: 'Post' },
    content: { type: String, required: true },
},{ timestamps: true });
var Comment = mongoose.model('Comment', CommentSchema, 'Comment');

module.exports = {
    Post,
    Comment
}; // this is what you want