//Require Mongoose
var mongoose = require('mongoose');

//Định nghĩa một schema
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  madon: String,
  ten: String,
  gia: String,
  anh: String,
  mota: String,
});
var Product = mongoose.model('Product', ProductSchema, 'Product');

module.exports = Product; // this is what you want