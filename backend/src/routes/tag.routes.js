const router = require("express-promise-router")();
const tagController = require("../controllers/tag.controller");
const authorization = require("../middlewares/authorization");
const { body } = require("express-validator");

router.post(
  "/tags",
  authorization.authenticate,
  body("id").not().exists(),
  body("label").isLength({ min: 1, max: 255 }).withMessage("Label error"),
  body("color").isLength({ min: 1, max: 255 }).withMessage("Color error"),
  body("architecte_id").not().exists(),
  tagController.create.bind(tagController)
);
router.get(
  "/tags",
  authorization.authenticate,
  tagController.getAll.bind(tagController)
);
router.get(
  "/tags/:id",
  authorization.authenticate,
  tagController.getOne.bind(tagController)
);
router.get(
  "/tags/:id/sumProjects",
  authorization.authenticate,
  tagController.totalProjectsByTag.bind(tagController)
);
router.put(
  "/tags/:id",
  authorization.authenticate,
  body("id").not().exists(),
  body("label").isLength({ min: 1 }).withMessage("Length error"),
  body("color").isLength({ min: 1 }).withMessage("Length error"),
  body("architecte_id").not().exists(),
  tagController.update.bind(tagController)
);
router.patch(
  "/tags/:id/label",
  authorization.authenticate,
  body("label").isLength({ min: 1, max: 255 }),
  tagController.updateLabel.bind(tagController)
);
router.delete(
  "/tags/:id",
  authorization.authenticate,
  tagController.delete.bind(tagController)
);

module.exports = router;
