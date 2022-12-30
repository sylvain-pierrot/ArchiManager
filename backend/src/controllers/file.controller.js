const db = require("../config/database");
const jwt = require("jsonwebtoken");
const Controller = require("./global.controller");

class FileController extends Controller {
  constructor() {
    super("fichiers");
  }

  async queryValidator(req, res) {
    try {
      // data
      const id = parseInt(req.params.idP);
      const architecte_id = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      ).id;

      // query
      const { rows } = await db.query(
        "SELECT * FROM projets WHERE id = $1 AND architecte_id = $2",
        [id, architecte_id]
      );
      // failed query
      if (rows.length < 1) {
        return res.status(403).json({ message: "Forbidden" });
      }
    } catch (error) {
      // server error
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getAll(req, res) {
    try {
      // queryValidator
      const result = await this.queryValidator(req, res);
      if (result) {
        return;
      }

      // data
      const foreignKey = {
        key: "projet_id",
        value: parseInt(req.params.idP),
      };

      // query
      super.getAll(req, res, foreignKey);
    } catch (error) {
      // server error
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getOne(req, res) {
    try {
      // queryValidator
      const result = await this.queryValidator(req, res);
      if (result) {
        return;
      }
    } catch (error) {
      // server error
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async create(req, res) {
    try {
      // queryValidator
      const result = await this.queryValidator(req, res);
      if (result) {
        return;
      }

      const project_id = parseInt(req.params.idP);
      // Get the file from the request object
      const file = req.file;

      // Read the file and get its contents as a buffer
      // const fileBuffer = Buffer.from(file.data);
      const fileBuffer = file.buffer;

      // query
      const { rows } = await db.query(
        "INSERT INTO fichiers (nom, type, fichier, projet_id) VALUES ($1, $2, $3, $4)  RETURNING *",
        [file.originalname, file.mimetype, fileBuffer, project_id]
      );

      // failed query
      if (rows.length < 1) {
        return res.status(401).json({ message: "Create error" });
      }
      console.log(rows[0]);
      // success query
      res.status(201).json(rows[0]);
    } catch (error) {
      // server error
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async delete(req, res) {
    // queryValidator
    const result = await this.queryValidator(req, res);
    if (result) {
      return;
    }

    // datas
    const primaryKey = {
      key: "id",
      value: parseInt(req.params.idF),
    };
    const foreignKey = {
      key: "projet_id",
      value: parseInt(req.params.idP),
    };

    // query
    super.delete(req, res, primaryKey, foreignKey);
  }

  async update(req, res) {
    // queryValidator
    const result = await this.queryValidator(req, res);
    if (result) {
      return;
    }
  }
}

module.exports = new FileController();
