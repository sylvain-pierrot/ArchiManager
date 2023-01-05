const router = require("express-promise-router")();
const architectController = require("../controllers/architect.controller");
const authorization = require("../middlewares/authorization");
const { body } = require("express-validator");

router.post(
  "/architects",
  body("id").not().exists(),
  body("numero_national").isInt().withMessage("National number error"),
  body("nom").isLength({ min: 1, max: 255 }).withMessage("Name error"),
  body("prenom").isLength({ min: 1, max: 255 }).withMessage("Firstname error"),
  body("email")
    .isEmail()
    .isLength({ min: 1, max: 255 })
    .withMessage("Email error"),
  body("mot_de_passe")
    .isLength({ min: 1, max: 255 })
    .withMessage("Length error"),
  body("telephone")
    .isLength({ min: 1, max: 255 })
    .withMessage("Phone number error"),
  body("role_id").not().exists(),
  architectController.create.bind(architectController)
);
router.get("/architects", architectController.getAll.bind(architectController));
router.get(
  "/architects/:id(\\d+)",
  authorization.authenticate,
  architectController.getOne.bind(architectController)
);
router.get(
  "/architects/isAdmin",
  authorization.authenticate,
  architectController.getIsAdmin.bind(architectController)
);
router.put(
  "/architects/:id",
  authorization.authenticate,
  body("numero_national").isInt().withMessage("Integer error"),
  body("nom").isLength({ min: 1 }).withMessage("Length error"),
  body("prenom").isLength({ min: 1 }).withMessage("Length error"),
  body("email").isEmail().withMessage("Email error"),
  body("telephone").isLength({ min: 5 }).withMessage("Length error"),
  body("role_id").not().exists(),
  architectController.update.bind(architectController)
);
router.delete(
  "/architects/:id",
  authorization.authenticate,
  architectController.delete.bind(architectController)
);

module.exports = router;
