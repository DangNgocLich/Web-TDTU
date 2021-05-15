var express = require('express');
const { addDepartmentController } = require('../controllers/adminController');
var router = express.Router();

router.post('/addDepartment', addDepartmentController)

module.exports = router;