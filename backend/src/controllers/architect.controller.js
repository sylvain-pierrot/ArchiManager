const bcrypt = require("bcrypt");
const Controller = require("./global.controller");

class ArchitectController extends Controller {
  constructor() {
    super("architectes");
  }

  getAll(req, res) {
    // datas
    const foreignKey = null;

    // query
    super.getAll(req, res, foreignKey);
  }

  getOne(req, res) {
    // datas
    const primaryKey = {
      key: "id",
      value: parseInt(req.params.id),
    };
    const foreignKey = null;

    // query
    super.getOne(req, res, primaryKey, foreignKey);
  }

  create = async (req, res) => {
    // Data
    const foreignKey = null;
    const password = req.body.mot_de_passe;

    // Generate a salt
    const saltRounds = 10;
    try {
      const salt = await bcrypt.genSalt(saltRounds);

      // Hash the password using the salt
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log(`The hashed password is: ${hashedPassword}`);

      // Store the hashed password in the request body
      req.body.mot_de_passe = hashedPassword;
    } catch (err) {
      console.error(err);
    }

    // Query
    super.create(req, res, foreignKey);
  };

  delete(req, res) {
    // datas
    const primaryKey = {
      key: "id",
      value: parseInt(req.params.id),
    };
    const foreignKey = null;

    // query
    super.delete(req, res, primaryKey, foreignKey);
  }

  update(req, res) {
    // datas
    const primaryKey = {
      key: "id",
      value: parseInt(req.params.id),
    };
    const foreignKey = null;

    // query
    super.update(req, res, primaryKey, foreignKey);
  }
}

module.exports = new ArchitectController();
