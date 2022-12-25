const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

exports.authenticate = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.clearCookie("user");
          res.clearCookie("token");
          res.send({ message: "Invalid token" });
        } else {
          // req.user = decoded;
          next();
        }
      });
    }
  } catch (err) {
    res.status(401).json({ message: "Access denided" });
  }
};
