const router = require("express-promise-router")();
const authController = require("../controllers/auth.controller");

router.post("/login", authController.loginArchitect);
router.post("/logout", authController.deleteRefreshTokenArchitect);
router.post("/refresh", authController.refreshTokenArchitect);

module.exports = router;
