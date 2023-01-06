const router = require("express-promise-router")();
const projectController = require("../controllers/project.controller.js");
const authorization = require("../middlewares/authorization");
const { body } = require("express-validator");

router.post(
  "/projects",
  authorization.authenticate,
  body("id").not().exists(),
  body("titre").isLength({ min: 1, max: 255 }).withMessage("Title error"),
  body("surface_fonciere")
    .isInt({ max: 99999 })
    .withMessage("Land surface error"),
  body("surface_indicative")
    .isInt({ max: 99999 })
    .withMessage("Indicative surface error"),
  body("ville").isLength({ min: 1, max: 255 }).withMessage("City error"),
  body("adresse").isLength({ min: 1, max: 255 }).withMessage("Address error"),
  body("date_debut").isDate().withMessage("Date error"),
  body("date_fin").isDate().withMessage("Date error"),
  body("description").optional(),
  body("statut_id").isInt().withMessage("Status error"),
  body("client_id").isInt().withMessage("Client error"),
  body("mission_id").isInt().withMessage("Mission error"),
  body("designation_id").isInt().withMessage("Designation error"),
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
  body("titre").isLength({ min: 1 }).withMessage("Length error"),
  body("surface_fonciere").isInt({ max: 99999 }).withMessage("Integer error"),
  body("surface_indicative").isInt({ max: 99999 }).withMessage("Integer error"),
  body("ville").isLength({ min: 1 }).withMessage("Length error"),
  body("adresse").isLength({ min: 1 }).withMessage("Length error"),
  body("date_debut").isDate().withMessage("Date error"),
  body("date_fin").isDate().withMessage("Date error"),
  body("description").optional(),
  body("statut_id").isInt().withMessage("Integer error"),
  body("client_id").isInt().withMessage("Integer error"),
  body("mission_id").isInt().withMessage("Integer error"),
  body("designation_id").isInt().withMessage("Integer error"),
  body("architecte_id").not().exists(),
  projectController.update.bind(projectController)
);
router.patch(
  "/projects/:id/status",
  body("statut_id").isInt().withMessage("Status error"),
  authorization.authenticate,
  projectController.updateStatusId.bind(projectController)
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
router.get(
  "/projects/feesCollected",
  authorization.authenticate,
  projectController.totalFeesCollected.bind(projectController)
);

module.exports = router;
