var express = require('express');
var router = express.Router();
const Order = require('../model/Order');
var mongoose = require('mongoose');
const AuthMiddleWare = require("../middleware/AuthMiddleware");
/* GET users listing. */
router.use(AuthMiddleWare.isAuth);
router.get('/', async function (req, res, next) {
    var data = await Order.find({}).populate({
        path: "danhsach",
        populate: {
            path: "product",

        }
    })
    return res.status(200).json({ data: data })
});
router.get('/:id', async function (req, res, next) {
    const id = req.params.id
    var data = await Order.find({ madon: id }).populate({
        path: "danhsach",
        populate: {
            path: "product",

        }
    })
    return res.status(200).json({ data: data })
});
router.put('/:id', async function (req, res, next) {
    const id = req.params.id
    const { tonggia, danhsach, } = req.body
    var neworder = { $set: { tonggia: tonggia, danhsach: danhsach } };
    var data = await Order.findByIdAndUpdate(id, neworder)
    console.log(data)
    if (data) {
        return res.status(200).json({ "messenge": "sua thanh cong" })
    }
    else {
        return res.status(400).json({ "messenge": "khong ton tai don hang" })
    }
});
router.delete('/:id', async function (req, res, next) {
    const id = req.params.id
    var data = await Order.findByIdAndDelete(id)
    console.log(data)
    if (data) {
        return res.status(200).json({ "messenge": "xoa thanh cong" })
    }
    else {
        return res.status(400).json({ "messenge": "khong ton tai don hang" })
    }
});
router.post('/', async function (req, res, next) {
    const { madon, tonggia, danhsach, } = req.body

    if (!madon || !tonggia || !danhsach) return res.status(400).json({ "messenge": "vui long nhap thong tin" })
    else {
        var order = new Order({ madon: madon, tonggia: tonggia, danhsach: danhsach })
        order.save(function (err, order) {
            if (err) return console.error(err);
            console.log(order)
            return res.status(200).json({ "messenge": "nhap thanh cong" },)
        });
    }
});
// router.get('/:id', async function (req, res, next) {
//     const id = req.params.id
//     if (!id) return res.status(400).json({ "messenge": "vui long nhap thong tin" })
//     const data = await Product.findOne({ 'madon': id })
//     if (data) {
//         return res.status(200).json({ "data": data })
//     }
//     else {
//         return res.status(400).json({ "messenge": "khong ton tai san pham" })
//     }
// });

// router.post('/', async function (req, res, next) {
//     const { madon, ten, gia, anh, mota } = req.body
//     if (!madon || !ten || !gia || !anh || !mota) return res.status(400).json({ "messenge": "vui long nhap thong tin" })
//     const data = await Product.findOne({ 'madon': madon })
//     console.log(data)
//     if (data) {
//         return res.status(400).json({ "messenge": "san pham ton tai" })
//     }
//     else {
//         var product = new Product({ madon: madon, ten: ten, gia: gia, anh: anh, mota: mota })
//         product.save(function (err, product) {
//             if (err) return console.error(err);
//             console.log(product)
//             return res.status(200).json({ "messenge": "nhap thanh cong" },)
//         });


//     }

// });
// router.put('/:id', async function (req, res, next) {
//     // res.end("321321")
//     const id = req.params.id
//     const { ten, gia, anh, mota } = req.body
//     if (!id||!ten || !gia || !anh || !mota) return res.status(400).json({ "messenge": "vui long nhap thong tin" })
//     var newproduct = { $set: { ten: ten, gia: gia, anh: anh, mota: mota } };
//     if (!id) return res.status(400).json({ "messenge": "vui long nhap thong tin" })
//     const data = await Product.findOne({ 'madon': id })
//     if (data) {
//         Product.updateOne({"madon":id},newproduct)
//     }
//     else {
//         return res.status(400).json({ "messenge": "khong ton tai san pham" })
//     }
// });
module.exports = router;
