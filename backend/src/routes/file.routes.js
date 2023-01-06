const router = require("express-promise-router")();
const fileController = require("../controllers/file.controller");
const authorization = require("../middlewares/authorization");
const multer = require("../middlewares/upload");

router.post(
  "/projects/:idP/files",
  authorization.authenticate,
  multer.upload.single("file"),
  fileController.create.bind(fileController)
);
router.get(
  "/projects/:idP/files",
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
  fileController.update.bind(fileController)
);
router.delete(
  "/projects/:idP/files/:idF",
  authorization.authenticate,
  fileController.delete.bind(fileController)
);

module.exports = router;
