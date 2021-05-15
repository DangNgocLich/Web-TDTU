//Require Mongoose
var mongoose = require('mongoose');

//Định nghĩa một schema
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  
  madon: String,
  tonggia: String,
  danhsach: [
    {
      product: {type: Schema.Types.ObjectId, ref: 'Product'},
      amount: Number
    }
  ],
});
var Order = mongoose.model('Order', OrderSchema,'Order');

module.exports = Order; // this is what you want


