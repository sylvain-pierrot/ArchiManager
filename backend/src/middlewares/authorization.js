const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

exports.authenticateJWT = (req, res, next) => {
  // Get the JWT from the request header
  const authHeader = req.headers.authorization;
  if (authHeader) {
    // Extract the JWT from the header
    const token = authHeader.split(" ")[1];
    // Verify the JWT using the secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        // If the JWT is invalid, return a 401 unauthorized response
        return res.sendStatus(401);
      }
      // If the JWT is valid, set the user object on the request object
      // so that it can be used in the route handler
      req.user = user;
      // Call the next middleware function
      next();
    });
  } else {
    // If the authorization header is not present, return a 401 unauthorized response
    res.sendStatus(401);
  }
};
