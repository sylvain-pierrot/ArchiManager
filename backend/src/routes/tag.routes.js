const router = require("express-promise-router")();
const tagController = require("../controllers/tag.controller");
const authorization = require("../middlewares/authorization");
const { body } = require("express-validator");

router.post(
  "/tags",
  authorization.authenticate,
  body("id").not().exists(),
  body("label").isLength({ min: 1 }),
  body("color").isLength({ min: 1 }),
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
router.put(
  "/tags/:id",
  authorization.authenticate,
  body("id").not().exists(),
  body("label").isLength({ min: 1 }),
  body("color").isLength({ min: 1 }),
  body("architecte_id").not().exists(),
  tagController.update.bind(tagController)
);
router.delete(
  "/tags/:id",
  authorization.authenticate,
  tagController.delete.bind(tagController)
);

module.exports = router;
