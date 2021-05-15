//Require Mongoose
var mongoose = require('mongoose');

//Định nghĩa một schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    displayName: { type: String, required: true },
    role: { type: String, enum: ["1", "2", 3] }
});
var User = mongoose.model('User', UserSchema, 'User');

module.exports = User; // this is what you want