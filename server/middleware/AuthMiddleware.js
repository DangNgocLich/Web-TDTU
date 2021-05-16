/**
 * Created by trungquandev.com's author on 16/10/2019.
 * src/controllers/auth.js
 */
const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);

// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "lichbmtlqd@gmail.com";

/**
 * Middleware: Authorization user by Token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 const isAuth = async (req, res, next) => {
  //Get token from client
  let tokenFromClient = req.headers["authorization"];
  if (tokenFromClient) {
    try {
      tokenFromClient = tokenFromClient.slice(7, tokenFromClient.length)
      //Check token
      const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);

      req.jwtDecoded = decoded;

      next();
    } catch (error) {
      console.log(error)
      return res.status(401).json({
        resultCode: -1,
        message: 'Unauthorized.',
      });
    }
  } else {
    return res.status(403).send({
      resultCode: -1,
      message: 'No token provided.',
    });
  }
}

module.exports = {
  isAuth: isAuth,
  accessTokenSecret
};