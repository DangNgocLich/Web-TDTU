//Require Mongoose
const { now } = require('mongoose');
var mongoose = require('mongoose');

//Định nghĩa một schema
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
    date: { type: Date, required: true, default: now() },
    title: { type: String, required: true },
    content: { type: String, required: true },
    department: { type: Schema.Types.ObjectId, ref: 'Department' },
});
var Notification = mongoose.model('Notification', NotificationSchema, 'Notification');

module.exports = Notification; // this is what you want