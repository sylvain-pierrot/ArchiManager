const db = require("../config/database");
const { validationResult } = require("express-validator");

class Controller {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async getAll(req, res, foreignKey) {
    try {
      // query
      const values = [];
      let query = `SELECT * FROM ${this.tableName}`;
      if (foreignKey) {
        query += ` WHERE ${foreignKey.key} = $1`;
        values.push(foreignKey.value);
      }
      const { rows } = await db.query(query, values);

      // failed query
      // if (rows.length < 1) {
      //   return res.status(401).json({ message: `Not found or error` });
      // }
      // success
      res.status(200).send(rows);
    } catch (error) {
      // server error
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getOne(req, res, primaryKey, foreignKey) {
    try {
      // query
      const values = [primaryKey.value];
      let query = `SELECT * FROM ${this.tableName} WHERE ${primaryKey.key} = $1`;
      if (foreignKey) {
        query += ` AND ${foreignKey.key} = $2`;
        values.push(foreignKey.value);
      }
      const { rows } = await db.query(query, values);

      // failed query
      // if (rows.length < 1) {
      //   return res.status(401).json({ message: `Not found or error` });
      // }
      // success
      res.status(200).send(rows);
    } catch (error) {
      // server error
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async create(req, res, foreignKey) {
    try {
      // validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // datas
      const datas = req.body;
      const keys = Object.keys(datas);
      const values = Object.values(datas);

      if (foreignKey != null) {
        keys.push(foreignKey.key);
        values.push(foreignKey.value);
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

  async delete(req, res, primaryKey, foreignKey) {
    try {
      // query
      const values = [primaryKey.value];
      let query = `DELETE FROM ${this.tableName} WHERE ${primaryKey.key} = $1`;
      if (foreignKey != null) {
        query += ` AND ${foreignKey.key} = $2`;
        values.push(foreignKey.value);
      }
      query += ` RETURNING *`;
      const { rows } = await db.query(query, values);

      // failed query
      if (rows.length < 1) {
        return res.status(401).json({ message: "Delete error" });
      }

      // success query
      res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async update(req, res, primaryKey, foreignKey) {
    try {
      // validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // datas
      const datas = req.body;
      const keys = Object.keys(datas);
      const values = Object.values(datas);

      let query = `UPDATE ${this.tableName} SET ${keys
        .map((key, i) => `${key} = $${i + 1}`)
        .join(", ")}  WHERE ${primaryKey.key} = $${keys.length + 1}`;

      keys.push(primaryKey.key);
      values.push(primaryKey.value);
      if (foreignKey != null) {
        query += ` AND ${foreignKey.key} = $${keys.length + 1}`;
        keys.push(foreignKey.key);
        values.push(foreignKey.value);
      }
      query += " RETURNING *";

      const { rows } = await db.query(query, values);

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
  }
}

module.exports = Controller;
