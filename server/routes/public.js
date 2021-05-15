var express = require('express');
var router = express.Router();

const Department = require('../model/Department');

router.get('/getDepartment', async function(req, res, next) {
    res.status(200).json({ resultCode: 1, data: await Department.find({}) })
});

module.exports = router;