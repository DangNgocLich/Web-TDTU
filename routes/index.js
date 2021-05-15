var express = require('express');
var router = express.Router();

/* GET home page. */
const AuthMiddleWare = require("../middleware/AuthMiddleware");
router.use(AuthMiddleWare.isAuth);
router.get('/', function(req, res, next) {
    res.end("321321")
});

module.exports = router;