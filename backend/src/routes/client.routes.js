const router = require("express-promise-router")();
const clientController = require("../controllers/client.controller");
const authorization = require("../middlewares/authorization");
const { body } = require("express-validator");

router.post(
  "/clients",
  authorization.authenticate,
  body("id").not().exists(),
  body("nom").isLength({ min: 1 }),
  body("nom_contact").isLength({ min: 1 }),
  body("email").isEmail(),
  body("adresse").isLength({ min: 1 }),
  body("ville").isLength({ min: 1 }),
  body("telephone").isInt(),
  body("notes").optional(),
  body("architecte_id").not().exists(),
  clientController.create.bind(clientController)
);
router.get(
  "/clients",
  authorization.authenticate,
  clientController.getAll.bind(clientController)
);
router.get(
  "/clients/:id",
  authorization.authenticate,
  clientController.getOne.bind(clientController)
);
router.put(
  "/clients/:id",
  authorization.authenticate,
  body("id").not().exists(),
  body("nom").isLength({ min: 1 }),
  body("nom_contact").isLength({ min: 1 }),
  body("email").isEmail(),
  body("adresse").isLength({ min: 1 }),
  body("ville").isLength({ min: 1 }),
  body("telephone").isInt(),
  body("notes").optional(),
  body("architecte_id").not().exists(),
  clientController.update.bind(clientController)
);
router.delete(
  "/clients/:id",
  authorization.authenticate,
  clientController.delete.bind(clientController)
);

module.exports = router;
