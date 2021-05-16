//Require Mongoose
const { now } = require('mongoose');
var mongoose = require('mongoose');

//Định nghĩa một schema
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, required: true, default: now() },
    content: { type: String, required: true },
    like: { type: Number },
    comment: { type: Array },
    picture: { type: String, },
    linkvideo: { type: String, },
});
var Post = mongoose.model('Post', PostSchema, 'Post');

module.exports = Post; // this is what you want