const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// exports.isAuthenticated = async (req, res) => {};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, mot_de_passe } = req.body;

    // Check if the email and password are valid
    const { rows } = await db.query(
      "SELECT * FROM architectes WHERE email = $1",
      [email]
    );
    const architect = rows[0];
    if (!architect) {
      return res.status(401).send("Invalid email or password");
    }

    // Compare the provided password with the hashed password in the database
    const validPassword = await bcrypt.compare(
      mot_de_passe,
      architect.mot_de_passe
    );
    if (!validPassword) {
      return res.status(401).send("Invalid email or password");
    }

    // Create a JWT
    const token = jwt.sign({ id: architect.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set the JWT as a cookie and send it to the client
    res.cookie("user", architect, {
      httpOnly: false,
    });
    res.cookie("token", token, {
      httpOnly: false,
    });
    res.send({ message: "Successfully logged in" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("user");
  res.clearCookie("token");
  res.json({ message: "Successfully logged out" });
};

exports.refresh = (req, res) => {
  const token = req.cookies.token;
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const id = decodedToken.id;
  const newToken = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", newToken, { httpOnly: false });
  res.json({ message: "Token refreshed" });
};

// exports.isAuthenticated = (req, res) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       return res
//         .status(400)
//         .json({ message: "Token is invalid", authenticated: false });
//     }
//     jwt.verify(token, process.env.JWT_SECRET);
//     return res.json({ message: "Token is valid", authenticated: true });
//   } catch (error) {
//     return res
//       .status(400)
//       .json({ message: "Token is invalid", authenticated: false });
//   }
// };
