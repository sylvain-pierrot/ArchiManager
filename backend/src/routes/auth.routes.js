const router = require("express-promise-router")();
const authController = require("../controllers/auth.controller");
const authorization = require("../middlewares/authorization");
const { body } = require("express-validator");

router.post(
  "/login",
  body("email").isEmail(),
  body("mot_de_passe").isLength({ min: 5 }),
  authController.login
);
router.post("/logout", authorization.authenticate, authController.logout);
router.post("/refresh", authorization.authenticate, authController.refresh);
router.post("/isAuthenticated", authController.isAuthenticated);

module.exports = router;
