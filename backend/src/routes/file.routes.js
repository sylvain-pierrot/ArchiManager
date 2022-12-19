const router = require("express-promise-router")();
const fileController = require("../controllers/file.controller");
const authorization = require("../middlewares/authorization");
const { body } = require("express-validator");

router.post(
  "/projects/:id/files",
  authorization.authenticate,
  body("nom").isLength({ min: 1 }),
  body("type").isLength({ min: 1 }),
  //   body("fichier").isMimeType(["fichier|pdf"]),
  fileController.create.bind(fileController)
);
router.get(
  "/projects/:id/files",
  authorization.authenticate,
  fileController.getAll.bind(fileController)
);
router.get(
  "/projects/:idP/files/:idF",
  authorization.authenticate,
  fileController.getOne.bind(fileController)
);
router.put(
  "/projects/:idP/files/:idF",
  authorization.authenticate,
  body("nom").isLength({ min: 1 }),
  body("type").isLength({ min: 1 }),
  //   body("fichier").isMimeType(["fichier|pdf"]),
  fileController.update.bind(fileController)
);
router.delete(
  "/projects/:idP/files/:idF",
  authorization.authenticate,
  fileController.delete.bind(fileController)
);

module.exports = router;
