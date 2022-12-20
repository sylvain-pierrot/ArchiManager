const router = require("express-promise-router")();
const statusController = require("../controllers/status.controller");
const authorization = require("../middlewares/authorization");
const { body } = require("express-validator");

router.post(
  "/status",
  authorization.authenticate,
  // body("id").not().exists(),
  body("label").isLength({ min: 1 }),
  statusController.create.bind(statusController)
);
router.get(
  "/status",
  authorization.authenticate,
  statusController.getAll.bind(statusController)
);
router.get(
  "/status/:id",
  authorization.authenticate,
  statusController.getOne.bind(statusController)
);
router.put(
  "/status/:id",
  authorization.authenticate,
  // body("id").not().exists(),
  body("label").isLength({ min: 1 }),
  statusController.update.bind(statusController)
);
router.delete(
  "/status/:id",
  authorization.authenticate,
  statusController.delete.bind(statusController)
);

module.exports = router;
