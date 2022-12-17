const router = require("express-promise-router")();
const architectController = require("../controllers/architect.controller");
const authorization = require("../middlewares/authorization");

router.post(
  "/architects",
  authorization.authenticateToken,
  architectController.createArchitect
);
router.get(
  "/architects",
  authorization.authenticateToken,
  architectController.listAllArchitects
);
router.get(
  "/architects/:id",
  authorization.authenticateToken,
  architectController.findArchitectById
);
router.put(
  "/architects/:id",
  authorization.authenticateToken,
  architectController.updateArchitectById
);
router.delete(
  "/architects/:id",
  authorization.authenticateToken,
  architectController.deleteArchitectById
);

module.exports = router;
