const router = require("express-promise-router")();
const projectController = require("../controllers/project.controller.js");
const authorization = require("../middlewares/authorization");
const { body } = require("express-validator");

router.post(
  "/projects",
  authorization.authenticate,
  body("id").not().exists(),
  body("titre").isLength({ min: 1 }),
  body("surface_fonciere").isInt(),
  body("surface_indicative").isInt(),
  body("ville").isLength({ min: 1 }),
  body("adresse").isLength({ min: 1 }),
  body("date_debut").isDate(),
  body("date_fin").isDate(),
  body("description").optional(),
  body("statut_id").isInt(),
  body("client_id").isInt(),
  body("architecte_id").not().exists(),
  projectController.create.bind(projectController)
);
router.get(
  "/projects",
  authorization.authenticate,
  projectController.getAll.bind(projectController)
);
router.get(
  "/projects/:id(\\d+)",
  authorization.authenticate,
  projectController.getOne.bind(projectController)
);
router.put(
  "/projects/:id",
  authorization.authenticate,
  body("id").not().exists(),
  body("titre").isLength({ min: 1 }),
  body("surface_fonciere").isInt(),
  body("surface_indicative").isInt(),
  body("ville").isLength({ min: 1 }),
  body("adresse").isLength({ min: 1 }),
  body("date_debut").isDate(),
  body("date_fin").isDate(),
  body("description").optional(),
  body("statut_id").isInt(),
  body("client_id").isInt(),
  body("architecte_id").not().exists(),
  projectController.update.bind(projectController)
);
router.delete(
  "/projects/:id",
  authorization.authenticate,
  projectController.delete.bind(projectController)
);
router.get(
  "/projects/fees",
  authorization.authenticate,
  projectController.getTotalFees.bind(projectController)
);

module.exports = router;
