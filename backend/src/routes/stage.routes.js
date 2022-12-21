const router = require("express-promise-router")();
const stageController = require("../controllers/stage.controller");
const authorization = require("../middlewares/authorization");
const { body } = require("express-validator");

router.post(
  "/projects/:id/stages",
  authorization.authenticate,
  body("id").not().exists(),
  body("code").isLength({ min: 1 }),
  body("label").isLength({ min: 1 }),
  body("honoraires").isInt(),
  body("description").isLength({ min: 1 }),
  body("projet_id").not().exists(),
  stageController.create.bind(stageController)
);
router.get(
  "/projects/:id/stages",
  authorization.authenticate,
  stageController.getAll.bind(stageController)
);
router.get(
  "/projects/:idP/stages/:idS",
  authorization.authenticate,
  stageController.getOne.bind(stageController)
);
router.put(
  "/projects/:idP/stages/:idS",
  authorization.authenticate,
  body("id").not().exists(),
  body("code").isLength({ min: 1 }),
  body("label").isLength({ min: 1 }),
  body("honoraires").isInt(),
  body("description").isLength({ min: 1 }),
  body("projet_id").not().exists(),
  stageController.update.bind(stageController)
);
router.delete(
  "/projects/:idP/stages/:idS",
  authorization.authenticate,
  stageController.delete.bind(stageController)
);

module.exports = router;
