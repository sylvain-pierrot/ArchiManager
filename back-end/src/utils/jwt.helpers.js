const jwt = require("jsonwebtoken");

exports.jwtTokens = ({ architect_id, architect_name, architect_email }) => {
  const architect = { architect_id, architect_name, architect_email };
  const accessToken = jwt.sign(architect, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20s",
  });
  const refreshToken = jwt.sign(architect, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "5m",
  });
  return { accessToken, refreshToken };
};
