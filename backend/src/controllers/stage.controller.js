const jwt = require("jsonwebtoken");
const db = require("../config/database");
const Controller = require("./global.controller");

class StageController extends Controller {
  constructor() {
    super("phases");
  }

  async getAll(req, res) {
    try {
      // data
      const id = parseInt(req.params.id);
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

      // data
      const foreignKey = {
        key: "projet_id",
        value: id,
      };

      // success
      super.getAll(req, res, foreignKey);
    } catch (error) {
      // server error
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getOne(req, res) {
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

      // data
      const primaryKey = {
        key: "id",
        value: parseInt(req.params.idS),
      };
      const foreignKey = {
        key: "projet_id",
        value: id,
      };

      // success
      super.getOne(req, res, primaryKey, foreignKey);
    } catch (error) {
      // server error
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async create(req, res) {
    try {
      // data
      const id = parseInt(req.params.id);
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

      // data
      const foreignKey = {
        key: "projet_id",
        value: id,
      };

      // success
      super.create(req, res, foreignKey);
    } catch (error) {
      // server error
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async delete(req, res) {
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

      // data
      const primaryKey = {
        key: "id",
        value: parseInt(req.params.idS),
      };
      const foreignKey = {
        key: "projet_id",
        value: id,
      };

      // success
      super.delete(req, res, primaryKey, foreignKey);
    } catch (error) {
      // server error
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async update(req, res) {
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

      // data
      const primaryKey = {
        key: "id",
        value: parseInt(req.params.idS),
      };
      const foreignKey = {
        key: "projet_id",
        value: id,
      };

      // success
      super.update(req, res, primaryKey, foreignKey);
    } catch (error) {
      // server error
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = new StageController();
