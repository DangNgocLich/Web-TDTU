/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */

const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/admin";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(mongoose.connection)
mongoose.Promise = global.Promise;
var db = mongoose.connection;
// console.log(db)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
