//Require Mongoose
var mongoose = require('mongoose');

//Định nghĩa một schema
var Schema = mongoose.Schema;

var DepartmentSchema = new Schema({
    label: String,
    value: String,
});
var Department = mongoose.model('Department', DepartmentSchema, 'Department');

module.exports = Department; // this is what you want