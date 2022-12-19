const db = require("../config/database");
const { validationResult } = require("express-validator");

class Controller {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async get(req, res, keys, values) {
    try {
      // query
      let query = `SELECT * FROM ${this.tableName}`;
      if (keys.length > 0) {
        query += ` WHERE ${keys
          .map((key, i) => `${key} = $${i + 1}`)
          .join(" AND ")}`;
      }
      const { rows } = await db.query(query, values);

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

  async create(req, res, keys, values) {
    try {
      // validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // query
      const query = `INSERT INTO ${this.tableName} (${keys.join(
        ", "
      )}) VALUES (${keys.map((_, i) => `$${i + 1}`).join(", ")}) RETURNING *`;
      const { rows } = await db.query(query, values);

      // failed query
      if (rows.length < 1) {
        return res.status(401).json({ message: "Create error" });
      }

      // success query
      res.status(201).json(rows[0]);
    } catch (error) {
      // server error
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async delete(req, res, keys, values) {
    try {
      // query
      const query = `DELETE FROM ${this.tableName} WHERE ${keys
        .map((key, i) => `${key} = $${i + 1}`)
        .join(" AND ")} RETURNING *`;
      const { rows } = await db.query(query, values);

      // failed query
      if (rows.length < 1) {
        return res.status(401).json({ message: "Delete error" });
      }

      // success query
      res.json({ message: "Deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async update(req, res, keys, where_keys, values) {
    try {
      // validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // query
      const query = `UPDATE ${this.tableName} SET ${keys
        .map((key, i) => `${key} = $${i + 1}`)
        .join(", ")} WHERE ${where_keys
        .map((key, i) => `${key} = $${keys.length + i + 1}`)
        .join(" AND ")} RETURNING *`;
      const { rows } = await db.query(query, values);

      // failed query
      if (rows.length < 1) {
        return res.status(401).send("Error update project");
      }

      // success
      res.status(200).json(rows[0]);
    } catch (err) {
      // server error
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = Controller;
