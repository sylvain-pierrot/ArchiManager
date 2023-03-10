const jwt = require("jsonwebtoken");
const db = require("../config/database");
const { validationResult } = require("express-validator");
const Controller = require("./global.controller");

class ProjectController extends Controller {
  constructor() {
    super("projets");
  }

  getAll(req, res) {
    // data
    const foreignKey = {
      key: "architecte_id",
      value: jwt.verify(req.cookies.token, process.env.JWT_SECRET).id,
    };

    // query
    super.getAll(req, res, foreignKey);
  }

  getOne(req, res) {
    // datas
    const primaryKey = {
      key: "id",
      value: parseInt(req.params.id),
    };
    const foreignKey = {
      key: "architecte_id",
      value: jwt.verify(req.cookies.token, process.env.JWT_SECRET).id,
    };

    // query
    super.getOne(req, res, primaryKey, foreignKey);
  }

  create(req, res) {
    // datas
    const foreignKey = {
      key: "architecte_id",
      value: jwt.verify(req.cookies.token, process.env.JWT_SECRET).id,
    };

    // query
    super.create(req, res, foreignKey);
  }

  delete(req, res) {
    // datas
    const primaryKey = {
      key: "id",
      value: parseInt(req.params.id),
    };
    const foreignKey = {
      key: "architecte_id",
      value: jwt.verify(req.cookies.token, process.env.JWT_SECRET).id,
    };

    // query
    super.delete(req, res, primaryKey, foreignKey);
  }

  update(req, res) {
    // datas
    const primaryKey = {
      key: "id",
      value: parseInt(req.params.id),
    };
    const foreignKey = {
      key: "architecte_id",
      value: jwt.verify(req.cookies.token, process.env.JWT_SECRET).id,
    };

    // query
    super.update(req, res, primaryKey, foreignKey);
  }

  updateStatusId = async (req, res) => {
    try {
      // validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // datas
      const { statut_id } = req.body;
      const id = parseInt(req.params.id);
      const architecte_id = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      ).id;

      // query
      const { rows } = await db.query(
        "UPDATE projets SET statut_id = $1 WHERE id = $2 AND architecte_id = $3  RETURNING *",
        [statut_id, id, architecte_id]
      );

      // failed query
      if (rows.length < 1) {
        return res.status(401).json({ message: "Error update project" });
      }

      // success
      res.status(200).json(rows[0]);
    } catch (err) {
      // server error
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

  getTotalFees = async (req, res) => {
    try {
      // data
      const architecte_id = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      ).id;

      // query
      const { rows } = await db.query(
        "SELECT SUM(ph.honoraires) FROM phases ph INNER JOIN projets pr ON ph.projet_id=pr.id WHERE pr.architecte_id = $1",
        [architecte_id]
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

  totalFeesCollected = async (req, res) => {
    try {
      // data
      const architecte_id = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      ).id;

      // query
      const { rows } = await db.query(
        "SELECT SUM(ph.honoraires_paye) FROM phases ph INNER JOIN projets pr ON ph.projet_id=pr.id WHERE pr.architecte_id = $1",
        [architecte_id]
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
}

module.exports = new ProjectController();
