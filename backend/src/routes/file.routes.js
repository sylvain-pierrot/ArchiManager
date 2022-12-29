const router = require("express-promise-router")();
const fileController = require("../controllers/file.controller");
const authorization = require("../middlewares/authorization");
const { body } = require("express-validator");
const multer = require("multer");
// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/projects/:idP/files",
  authorization.authenticate,
  upload.single("file"),
  // body("nom").isLength({ min: 1 }),
  // body("type").isLength({ min: 1 }),
  //   body("fichier").isMimeType(["fichier|pdf"]),
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
