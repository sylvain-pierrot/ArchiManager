const router = require("express-promise-router")();
const clientController = require("../controllers/client.controller");
const authorization = require("../middlewares/authorization");
const { body } = require("express-validator");

router.post(
  "/clients",
  authorization.authenticate,
  body("nom").isLength({ min: 1 }),
  body("nom_contact").isLength({ min: 1 }),
  body("email").isEmail(),
  body("adresse").isLength({ min: 1 }),
  body("telephone").isInt(),
  clientController.createClient
);
router.get(
  "/clients",
  authorization.authenticate,
  clientController.listAllClients
);
router.get(
  "/clients/:id",
  authorization.authenticate,
  clientController.findClientById
);
router.put(
  "/clients/:id",
  authorization.authenticate,
  body("nom").isLength({ min: 1 }),
  body("nom_contact").isLength({ min: 1 }),
  body("email").isEmail(),
  body("adresse").isLength({ min: 1 }),
  body("telephone").isInt(),
  clientController.updateClientById
);
router.delete(
  "/clients/:id",
  authorization.authenticate,
  clientController.deleteClientById
);

module.exports = router;
