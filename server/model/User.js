//Require Mongoose
var mongoose = require('mongoose');

//Định nghĩa một schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true ,  select: false},
    displayName: { type: String, required: true },
    role: { type: String, enum: ["1", "2", "3"] },
    picture: { type: String, },
    className: { type: String, },
    faculty: { type: String, },
    department: [{type: Schema.Types.ObjectId, ref: 'Department'}],
    inNew: Boolean,
},{ timestamps: true });
var User = mongoose.model('User', UserSchema, 'User');

module.exports = User; // this is what you want