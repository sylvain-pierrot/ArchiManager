const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

exports.authenticate = (req, res, next) => {
  try {
    const token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is invalid" });
  }
};
