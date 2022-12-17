const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwtHelpers = require("../utils/jwt.helpers");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { architect_id, architect_email, architect_password } = req.body;
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
    // let tokens = jwtHelpers.jwtTokens(rows[0]);
    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET
    );
    res.json({ token });
    res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
    // res.json(tokens);
    // res.status(200).json("Success");
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.refresh = (req, res) => {
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

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   // Validate the request body
//   const validationErrors = validations.validate({
//     username: { presence: true, type: 'string' },
//     password: { presence: true, type: 'string' }
//   }, { username, password });

//   if (validationErrors) {
//     return res.status(400).send({ message: 'Invalid request body', errors: validationErrors });
//   }

//   // Connect to the database
//   const client = new Client();
//   client.connect();

//   // Verify the username and password
//   // If they are valid, generate a JWT and set it as a cookie
//   // Otherwise, return an error message

//   try {
//     // Query the database for the user
//     const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);

//     if (result.rowCount === 0) {
//       throw new Error('Invalid username or password');
//     }

//     const user = result.rows[0];

//     // Compare the plaintext password with the hashed password
//     if (!bcrypt.compareSync(password, user.password)) {
//       throw new Error('Invalid username or password');
//     }

//     const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
//     res.cookie('token', token, { httpOnly: true });
//     res.send({ message: 'Logged in successfully' });
//   } catch (err) {
//     res.status(401).send({ message: err.message });
//   } finally {
//     client.end();
//   }
// });

// function refresh(req, res) {
//   // Get the refresh token from the request cookies
//   const refreshToken = req.cookies.refreshToken;
//   // Verify the refresh token using the secret key
//   jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       // If the refresh token is invalid, return a 401 unauthorized response
//       return res.sendStatus(401);
//     }
//     // If the refresh token is valid, generate a new JWT with the same user information
//     const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET);
//     res.json({ token });
//   });
// }

// function logout(req, res) {
//   // Clear the refresh token from the cookies
//   res.clearCookie('refreshToken');
//   // Return a 200 OK response
//   res.sendStatus(200);
// }

// Sylvain PIERROT
// node API REST with express and node-postgres.
// create authentication, controller login, logout and refresh with all send status

// use:
// - json web token
// - cookie-parser for token
// - validationsjs for validation before query, check size, type and required
// - bcrypt for compare password
