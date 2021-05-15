var express = require('express');
var router = express.Router();

/* GET home page. */
// const AuthMiddleWare = require("../middleware/AuthMiddleware");
const Department = require('../model/Department');
// router.use(AuthMiddleWare.isAuth);
router.get('/getDepartment', async function(req, res, next) {
    res.status(200).json(await Department.find({}))
});
router.post('/addDepartment', async function(req, res, next) {
    const { label, value } = req.body
    if (!label || !value) return res.status(400).json({ "messenge": "vui long nhap thong tin" })
    const data = await Department.findOne({ 'value': value })
    var user = new Department({ label: label, value: value })
    if (data) {
        res.status(400).json({ "messenge": "Phòng khoa Đã tồn tại" })
    } else {
        user.save(function(err, user) {
            if (err) return console.error(err);
            console.log(user)
            res.status(200).json({ "messenge": "Thêm phòng khoa thành công" }, )
        });
    }

});

module.exports = router;