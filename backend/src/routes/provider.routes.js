const router = require("express-promise-router")();
const providerController = require("../controllers/provider.controller");
const authorization = require("../middlewares/authorization");
const { body } = require("express-validator");

router.post(
  "/providers",
  authorization.authenticate,
  body("assurance").isMimeType(["assurance/pdf"]),
  body("nom").isLength({ min: 1 }),
  body("nom_contact").isLength({ min: 1 }),
  body("adresse").isLength({ min: 1 }),
  body("telephone").isInt(),
  body("email").isEmail(),
  body("siret").isInt(),
  providerController.create.bind(providerController)
);
router.get(
  "/providers",
  authorization.authenticate,
  providerController.getAll.bind(providerController)
);
router.get(
  "/providers/:id",
  authorization.authenticate,
  providerController.getOne.bind(providerController)
);
router.put(
  "/providers/:id",
  authorization.authenticate,
  body("assurance").isMimeType(["assurance/pdf"]),
  body("nom").isLength({ min: 1 }),
  body("nom_contact").isLength({ min: 1 }),
  body("adresse").isLength({ min: 1 }),
  body("telephone").isInt(),
  body("email").isEmail(),
  body("siret").isInt(),
  providerController.update.bind(providerController)
);
router.delete(
  "/providers/:id",
  authorization.authenticate,
  providerController.delete.bind(providerController)
);

module.exports = router;
