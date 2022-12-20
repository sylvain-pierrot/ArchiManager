const router = require("express-promise-router")();
const taskController = require("../controllers/task.controller");
const authorization = require("../middlewares/authorization");
const { body } = require("express-validator");

router.post(
  "projects/:idP/stages/:idT/tasks",
  authorization.authenticate,
  body("id").not().exists(),
  body("titre").isLength({ min: 1 }),
  // body("annexe").isMimeType(["assurance/pdf"]),
  body("description").isLength({ min: 1 }),
  body("date_echeance").isDate(),
  body("phase_id").not().exists(),
  body("prestataire_id").isInt(),
  body("realise_par_architecte").isBoolean(),
  body("architecte_id").isInt(),
  taskController.create.bind(taskController)
);
router.get(
  "projects/:idP/stages/:idS/tasks",
  authorization.authenticate,
  taskController.getAll.bind(taskController)
);
router.get(
  "projects/:idP/stages/:id/tasks/:idT",
  authorization.authenticate,
  taskController.getOne.bind(taskController)
);
router.put(
  "projects/:idP/stages/:idS/tasks/:idT",
  authorization.authenticate,
  body("id").not().exists(),
  body("titre").isLength({ min: 1 }),
  // body("annexe").isMimeType(["assurance/pdf"]),
  body("description").isLength({ min: 1 }),
  body("date_echeance").isDate(),
  body("phase_id").not().exists(),
  body("prestataire_id").isInt(),
  body("realise_par_architecte").isBoolean(),
  body("architecte_id").isInt(),
  taskController.update.bind(taskController)
);
router.delete(
  "projects/:idP/stages/:idS/tasks/:idT",
  authorization.authenticate,
  taskController.delete.bind(taskController)
);

module.exports = router;
