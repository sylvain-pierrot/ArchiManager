const router = require("express-promise-router")();
const authController = require("../controllers/auth.controller");
const authorization = require("../middlewares/authorization");
const { body } = require("express-validator");

router.post(
  "/login",
  body("email").isEmail().isLength({ min: 1, max: 255 }),
  body("mot_de_passe").isLength({ min: 1, max: 255 }),
  authController.login
);
router.post("/logout", authorization.authenticate, authController.logout);
router.post("/refresh", authorization.authenticate, authController.refresh);
// router.get("/isAuthenticated", authController.isAuthenticated);

module.exports = router;
