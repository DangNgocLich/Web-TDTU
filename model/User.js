//Require Mongoose
var mongoose = require('mongoose');

//Định nghĩa một schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userName: String,
  passWord: String,
});
var User = mongoose.model('User', UserSchema, 'User');

module.exports = User; // this is what you want