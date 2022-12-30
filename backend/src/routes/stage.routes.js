const router = require("express-promise-router")();
const stageController = require("../controllers/stage.controller");
const authorization = require("../middlewares/authorization");
const { body } = require("express-validator");

router.post(
  "/projects/:idP/stages",
  authorization.authenticate,
  body("id").not().exists(),
  body("code").isLength({ min: 1 }),
  body("label").isLength({ min: 1 }),
  body("honoraires").isInt(),
  body("description").optional(),
  body("progression").not().exists(),
  body("projet_id").not().exists(),
  stageController.create.bind(stageController)
);
router.get(
  "/projects/:idP/stages",
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
  body("description").optional(),
  body("progression").isBoolean(),
  body("honoraires_paye").not().exists(),
  body("projet_id").not().exists(),
  stageController.update.bind(stageController)
);
router.put(
  "/projects/:idP/stages/:idS/paid",
  authorization.authenticate,
  body("honoraires_paye").isInt(),
  stageController.updatePaid.bind(stageController)
);
router.put(
  "/projects/:idP/stages/:idS/fees",
  authorization.authenticate,
  body("honoraires").isInt(),
  stageController.updateFees.bind(stageController)
);
router.put(
  "/projects/:idP/stages/:idS/progress",
  authorization.authenticate,
  body("progression").isBoolean(),
  stageController.updateProgress.bind(stageController)
);
router.delete(
  "/projects/:idP/stages/:idS",
  authorization.authenticate,
  stageController.delete.bind(stageController)
);

module.exports = router;
