const router = require("express-promise-router")();
const architectController = require("../controllers/architect.controller");
const authorization = require("../middlewares/authorization");
const { body } = require("express-validator");

router.post(
  "/architects",
  body("id").not().exists(),
  body("numero_national").isInt(),
  body("nom").isLength({ min: 1 }),
  body("prenom").isLength({ min: 1 }),
  body("email").isEmail(),
  body("mot_de_passe").isLength({ min: 5 }),
  body("telephone").isInt(),
  architectController.create.bind(architectController)
);
router.get(
  "/architects",
  authorization.authenticate,
  architectController.getAll.bind(architectController)
);
router.get(
  "/architects/:id",
  authorization.authenticate,
  architectController.getOne.bind(architectController)
);
router.put(
  "/architects/:id",
  authorization.authenticate,
  body("id").not().exists(),
  body("numero_national").isInt(),
  body("nom").isLength({ min: 1 }),
  body("prenom").isLength({ min: 1 }),
  body("email").isEmail(),
  body("telephone").isInt(),
  architectController.update.bind(architectController)
);
router.delete(
  "/architects/:id",
  authorization.authenticate,
  architectController.delete.bind(architectController)
);

module.exports = router;
