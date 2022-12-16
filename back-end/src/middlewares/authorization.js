const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Bearer TOKEN
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    return res.status(401).json({ error: "Null token" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, architect) => {
    console.log(architect);
    console.log(process.env.ACCESS_TOKEN_SECRET);
    console.log(authHeader);
    if (error) {
      return res.status(403).json({ error: error.message });
    }
    req.architect = architect;
    next();
  });
};
