const jwt = require("jsonwebtoken");
const db = require("../config/database");
const Controller = require("./global.controller");

class TaskController extends Controller {
  constructor() {
    super("taches");
  }

  async queryValidator(req, res) {
    try {
      // data
      const idP = parseInt(req.params.idP);
      const idS = parseInt(req.params.idS);
      const architecte_id = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      ).id;

      // query
      const { rows } = await db.query(
        "SELECT * FROM phases ph INNER JOIN projets pr ON ph.projet_id=pr.id WHERE ph.id = $1 AND ph.projet_id = $2 AND pr.architecte_id = $3",
        [idS, idP, architecte_id]
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
      key: "phase_id",
      value: idS,
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
      key: "id",
      value: parseInt(req.params.idT),
    };
    const foreignKey = {
      key: "phase_id",
      value: idS,
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
      key: "phase_id",
      value: idS,
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
      key: "id",
      value: parseInt(req.params.idT),
    };
    const foreignKey = {
      key: "phase_id",
      value: idS,
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
      key: "id",
      value: parseInt(req.params.idT),
    };
    const foreignKey = {
      key: "phase_id",
      value: idS,
    };

    // success
    super.update(req, res, primaryKey, foreignKey);
  }
}

module.exports = new TaskController();
