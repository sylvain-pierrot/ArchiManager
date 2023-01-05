const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/database");
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

  // getMe = async (req, res) => {
  //   try {
  //     // datas
  //     const id = jwt.verify(req.cookies.token, process.env.JWT_SECRET).id;

  //     // query
  //     const { rows } = await db.query(
  //       `SELECT * FROM ${this.tableName} WHERE id = $1`,
  //       [id]
  //     );

  //     // failed query
  //     if (rows.length < 1) {
  //       return res.status(401).json({ message: `Not found or error` });
  //     }

  //     // success
  //     res.status(200).send(rows);
  //   } catch (error) {
  //     // server error
  //     console.error(error);
  //     res.status(500).json({ message: "Server error" });
  //   }
  // };

  getIsAdmin = async (req, res) => {
    try {
      // datas
      const id = jwt.verify(req.cookies.token, process.env.JWT_SECRET).id;

      // query
      const { rows } = await db.query(
        `SELECT role_id FROM ${this.tableName} WHERE id = $1`,
        [id]
      );

      // failed query
      if (rows.length < 1) {
        return res.status(401).json({ message: `Not found or error` });
      }

      // success
      res.status(200).send(rows);
    } catch (error) {
      // server error
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

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
