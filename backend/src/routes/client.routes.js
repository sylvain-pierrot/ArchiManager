const router = require("express-promise-router")();
const clientController = require("../controllers/client.controller");
const authorization = require("../middlewares/authorization");
const { body } = require("express-validator");

router.post(
  "/clients",
  authorization.authenticate,
  body("id").not().exists(),
  body("nom").isLength({ min: 1, max: 255 }).withMessage("Name error"),
  body("nom_contact")
    .isLength({ min: 1, max: 255 })
    .withMessage("Contact name error"),
  body("email")
    .isEmail()
    .isLength({ min: 1, max: 255 })
    .withMessage("Email error"),
  body("adresse").isLength({ min: 1, max: 255 }).withMessage("Address error"),
  body("ville").isLength({ min: 1, max: 255 }).withMessage("City error"),
  body("telephone")
    .isLength({ min: 1, max: 255 })
    .withMessage("Phone number error"),
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
  body("nom").isLength({ min: 1 }).withMessage("Length error"),
  body("nom_contact").isLength({ min: 1 }).withMessage("Length error"),
  body("email").isEmail().withMessage("Email error"),
  body("adresse").isLength({ min: 1 }).withMessage("Length error"),
  body("ville").isLength({ min: 1 }).withMessage("Length error"),
  body("telephone").isLength({ min: 1 }).withMessage("Length error"),
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
