const jwt = require("jsonwebtoken");
const db = require("../config/database");
const Controller = require("./global.controller");

class Tag_projectController extends Controller {
  constructor() {
    super("tags_projets");
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

    // success
    super.getAll(req, res, foreignKey);
  }

  async getOne(req, res) {
    // queryValidator
    const result = await this.queryValidator(req, res);
    if (result) {
      return;
    }

    // data
    const primaryKey = {
      key: "tag_id",
      value: parseInt(req.params.idT),
    };
    const foreignKey = {
      key: "projet_id",
      value: parseInt(req.params.idP),
    };

    // success
    super.getOne(req, res, primaryKey, foreignKey);
  }

  async create(req, res) {
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

    // success
    super.create(req, res, foreignKey);
  }

  async delete(req, res) {
    // queryValidator
    const result = await this.queryValidator(req, res);
    if (result) {
      return;
    }

    // data
    const primaryKey = {
      key: "tag_id",
      value: parseInt(req.params.idT),
    };
    const foreignKey = {
      key: "projet_id",
      value: parseInt(req.params.idP),
    };

    // success
    super.delete(req, res, primaryKey, foreignKey);
  }

  async update(req, res) {
    // queryValidator
    const result = await this.queryValidator(req, res);
    if (result) {
      return;
    }

    // data
    const primaryKey = {
      key: "tag_id",
      value: parseInt(req.params.idT),
    };
    const foreignKey = {
      key: "projet_id",
      value: parseInt(req.params.idP),
    };

    // success
    super.update(req, res, primaryKey, foreignKey);
  }
}

module.exports = new Tag_projectController();
