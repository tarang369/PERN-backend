const jwt = require("jsonwebtoken");
require("dotenv").config();
// module.exports = function (req, res, next) {
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("jwt_token");
  // Check if not token
  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }
  // Verify token
  try {
    //it is going to give use the user id (user:{id: user.id})
    const verify = jwt.verify(token, process.env.jwtSecret);
    req.user = verify.user;
    //this middleware will on continue on if the token is inside the local storage
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Token is not valid!!!");
  }
};
