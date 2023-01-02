const router = require("express-promise-router")();
const tag_projectController = require("../controllers/tag_project.controller");
const authorization = require("../middlewares/authorization");
const { body } = require("express-validator");

router.post(
  "/projects/:idP/tags",
  authorization.authenticate,
  body("tag_id").isInt().withMessage("Integer error"),
  body("projet_id").not().exists(),
  tag_projectController.create.bind(tag_projectController)
);
router.get(
  "/projects/:idP/tags",
  authorization.authenticate,
  tag_projectController.getAll.bind(tag_projectController)
);
router.get(
  "/projects/:idP/tags/:idT",
  authorization.authenticate,
  tag_projectController.getOne.bind(tag_projectController)
);
router.put(
  "/projects/:idP/tags/:idT",
  authorization.authenticate,
  body("tag_id").isInt().withMessage("Integer error"),
  body("projet_id").not().exists(),
  tag_projectController.update.bind(tag_projectController)
);
router.delete(
  "/projects/:idP/tags/:idT",
  authorization.authenticate,
  tag_projectController.delete.bind(tag_projectController)
);
router.delete(
  "/projects/:idP/tags",
  authorization.authenticate,
  tag_projectController.deleteAll.bind(tag_projectController)
);

module.exports = router;
