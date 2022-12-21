const jwt = require("jsonwebtoken");
const db = require("../config/database");
const { validationResult } = require("express-validator");
const Controller = require("./global.controller");

class ParcelController extends Controller {
  constructor() {
    super("parcelles");
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
      const id = parseInt(req.params.id);
      const architecte_id = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      ).id;

      // query
      const validationQuery = await db.query(
        "SELECT * FROM projets WHERE id = $1 AND architecte_id = $2",
        [id, architecte_id]
      );
      // failed query
      if (validationQuery.rows.length < 1) {
        return res.status(403).json({ message: "Forbidden" });
      }

      // data
      const section = req.params.section;
      const number = parseInt(req.params.number);
      const projet_id = id;

      // success
      const { rows } = await db.query(
        "SELECT * FROM parcelles WHERE section = $1 AND numero = $2 AND projet_id = $3",
        [section, number, projet_id]
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
  }

  async create(req, res) {
    try {
      // validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

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
      const id = parseInt(req.params.id);
      const architecte_id = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      ).id;

      // query
      const validationQuery = await db.query(
        "SELECT * FROM projets WHERE id = $1 AND architecte_id = $2",
        [id, architecte_id]
      );
      // failed query
      if (validationQuery.rows.length < 1) {
        return res.status(403).json({ message: "Forbidden" });
      }

      // data
      const section = req.params.section;
      const number = parseInt(req.params.number);
      const projet_id = id;

      // success
      const { rows } = await db.query(
        "DELETE FROM parcelles WHERE section = $1 AND numero = $2 AND projet_id = $3 RETURNING *",
        [section, number, projet_id]
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
  }

  async update(req, res) {
    try {
      // validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // data
      const id = parseInt(req.params.id);
      const architecte_id = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      ).id;

      // query
      const validationQuery = await db.query(
        "SELECT * FROM projets WHERE id = $1 AND architecte_id = $2",
        [id, architecte_id]
      );
      // failed query
      if (validationQuery.rows.length < 1) {
        return res.status(403).json({ message: "Forbidden" });
      }

      // data
      const surface = parseInt(req.body.surface);
      const section = req.params.section;
      const number = parseInt(req.params.number);
      const projet_id = id;

      // success
      const { rows } = await db.query(
        "UPDATE parcelles SET surface = $1 WHERE section = $2 AND numero = $3 AND projet_id = $4 RETURNING *",
        [surface, section, number, projet_id]
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
  }
}

module.exports = new ParcelController();
