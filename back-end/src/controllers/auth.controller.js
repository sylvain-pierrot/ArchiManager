const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwtHelpers = require("../utils/jwt.helpers");

exports.loginArchitect = async (req, res) => {
  try {
    const { architect_email, architect_password } = req.body;
    const { rows } = await db.query(
      "SELECT architect_id, architect_name, architect_email FROM architect WHERE architect_email = $1",
      [architect_email]
    );
    if (rows.length < 1) {
      return res.status(401).json({ error: "Email is incorrect" });
    }
    // PASSWORD CHECK
    const validPassword = await bcrypt.compare(
      architect_password,
      rows[0].architect_password
    );
    if (!validPassword) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    // JWT
    let tokens = jwtHelpers.jwtTokens(rows[0]);
    res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
    res.json(tokens);
    // res.status(200).json("Success");
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.refreshTokenArchitect = (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (refreshToken === null) {
      return res.status(401).json({ error: "Null refresh token" });
    }
    jwtHelpers.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, architect) => {
        if (error) {
          return res.status(403).json({ error: error.message });
        }
        let tokens = jwtHelpers.jwtTokens(architect);
        res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
        res.json(tokens);
      }
    );
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.deleteRefreshTokenArchitect = (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({ message: "refresh token deleted." });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
