const router = require("express-promise-router")();
const architectController = require("../controllers/architect.controller");
const authorization = require("../middlewares/authorization");
const { body } = require("express-validator");

router.post(
  "/architects",
  body("id").not().exists(),
  body("numero_national").isInt().withMessage("Bad national number"),
  body("nom").isLength({ min: 1 }).withMessage("Bad name"),
  body("prenom").isLength({ min: 1 }).withMessage("Bad firstname"),
  body("email").isEmail().withMessage("Is not email"),
  body("mot_de_passe").isLength({ min: 5 }).withMessage("Bad password"),
  body("telephone").isLength({ min: 5 }).withMessage("Bad phone number"),
  architectController.create.bind(architectController)
);
router.get("/architects", architectController.getAll.bind(architectController));
router.get(
  "/architects/:id",
  authorization.authenticate,
  architectController.getOne.bind(architectController)
);
router.put(
  "/architects/:id",
  authorization.authenticate,
  body("numero_national").isInt().withMessage("Bad national number"),
  body("nom").isLength({ min: 1 }).withMessage("Bad name"),
  body("prenom").isLength({ min: 1 }).withMessage("Bad firstname"),
  body("email").isEmail().withMessage("Is not email"),
  body("telephone").isLength({ min: 5 }).withMessage("Bad phone number"),
  architectController.update.bind(architectController)
);
router.delete(
  "/architects/:id",
  authorization.authenticate,
  architectController.delete.bind(architectController)
);

module.exports = router;
