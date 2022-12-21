const router = require("express-promise-router")();
const parcelController = require("../controllers/parcel.controller");
const authorization = require("../middlewares/authorization");
const { body } = require("express-validator");

router.post(
  "/projects/:id/parcels",
  authorization.authenticate,
  body("section").isLength({ min: 1 }),
  body("numero").isInt(),
  body("surface").isInt(),
  body("projet_id").not().exists(),
  parcelController.create.bind(parcelController)
);
router.get(
  "/projects/:id/parcels",
  authorization.authenticate,
  parcelController.getAll.bind(parcelController)
);
router.get(
  "/projects/:id/parcels/:section/:number",
  authorization.authenticate,
  parcelController.getOne.bind(parcelController)
);
router.put(
  "/projects/:id/parcels/:section/:number",
  authorization.authenticate,
  body("section").not().exists(),
  body("numero").not().exists(),
  body("surface").isInt(),
  body("projet_id").not().exists(),
  parcelController.update.bind(parcelController)
);
router.delete(
  "/projects/:id/parcels/:section/:number",
  authorization.authenticate,
  parcelController.delete.bind(parcelController)
);

module.exports = router;
