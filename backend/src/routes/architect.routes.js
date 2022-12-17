const router = require("express-promise-router")();
const architectController = require("../controllers/architect.controller");
const authorization = require("../middlewares/authorization");
const { body } = require("express-validator");

router.post(
  "/architects",
  authorization.authenticate,
  body("numero_national").isInt(),
  body("nom").isLength({ min: 1 }),
  body("prenom").isLength({ min: 1 }),
  body("email").isEmail(),
  body("mot_de_passe").isLength({ min: 5 }),
  body("telephone").isInt(),
  architectController.createArchitect
);
router.get(
  "/architects",
  authorization.authenticate,
  architectController.listAllArchitects
);
router.get(
  "/architects/:id",
  authorization.authenticate,
  architectController.findArchitectById
);
router.put(
  "/architects/:id",
  authorization.authenticate,
  body("numero_national").isInt(),
  body("nom").isLength({ min: 1 }),
  body("prenom").isLength({ min: 1 }),
  body("email").isEmail(),
  body("telephone").isInt(),
  architectController.updateArchitectById
);
router.delete(
  "/architects/:id",
  authorization.authenticate,
  architectController.deleteArchitectById
);

module.exports = router;
