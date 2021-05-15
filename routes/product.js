var express = require('express');
var router = express.Router();
const Product = require('../model/Product');
const AuthMiddleWare = require("../middleware/AuthMiddleware");
/* GET users listing. */
router.get('/', function (req, res, next) {
    Product.find({}, function (err, products) {
        return res.status(200).json({ "data": products })
    });

});
router.get('/:id', async function (req, res, next) {
    const id = req.params.id
    if (!id) return res.status(400).json({ "messenge": "vui long nhap thong tin" })
    const data = await Product.findOne({ 'madon': id })
    if (data) {
        return res.status(200).json({ "data": data })
    }
    else {
        return res.status(400).json({ "messenge": "khong ton tai san pham" })
    }
});
router.use(AuthMiddleWare.isAuth);
router.post('/', async function (req, res, next) {
    const { madon, ten, gia, anh, mota } = req.body
    if (!madon || !ten || !gia || !anh || !mota) return res.status(400).json({ "messenge": "vui long nhap thong tin" })
    const data = await Product.findOne({ 'madon': madon })
    console.log(data)
    if (data) {
        return res.status(400).json({ "messenge": "san pham ton tai" })
    }
    else {
        var product = new Product({ madon: madon, ten: ten, gia: gia, anh: anh, mota: mota })
        product.save(function (err, product) {
            if (err) return console.error(err);
            console.log(product)
            return res.status(200).json({ "messenge": "nhap thanh cong" },)
        });


    }

});
router.put('/:id', async function (req, res, next) {
    // res.end("321321")
    // res.end("123213")
    const id = req.params.id
    const { ten, gia, anh, mota } = req.body
    if (!id||!ten || !gia || !anh || !mota) return res.status(400).json({ "messenge": "vui long nhap thong tin" })
    var newproduct = { $set: { ten: ten, gia: gia, anh: anh, mota: mota } };
    if (!id) return res.status(400).json({ "messenge": "vui long nhap thong tin" })
    const data = await Product.findOne({ 'madon': id })
    // console.log(data)
    if (data) {
        Product.updateOne({"madon":id},newproduct).then((res)=>{
            console.log(res)
        })
        return res.status(200).json({ "messenge": "sua thanh cong" })
    }
    else {
        return res.status(400).json({ "messenge": "khong ton tai san pham" })
    }
});
module.exports = router;
