const router = require("express-promise-router")();
const authController = require("../controllers/auth.controller");

router.post("/login", authController.loginArchitect);
router.get("/refresh_token", authController.refreshTokenArchitect);
router.delete("/refresh_token", authController.deleteRefreshTokenArchitect);

module.exports = router;
