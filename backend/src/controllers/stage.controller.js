const jwt = require("jsonwebtoken");
const db = require("../config/database");
const Controller = require("./global.controller");

class StageController extends Controller {
  constructor() {
    super("phases");
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
      key: "id",
      value: parseInt(req.params.idS),
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
      key: "id",
      value: parseInt(req.params.idS),
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
      key: "id",
      value: parseInt(req.params.idS),
    };
    const foreignKey = {
      key: "projet_id",
      value: parseInt(req.params.idP),
    };

    // success
    super.update(req, res, primaryKey, foreignKey);
  }

  async updateProgress(req, res) {
    try {
      // queryValidator
      const result = await this.queryValidator(req, res);
      if (result) {
        return;
      }

      // datas
      const { progression } = req.body;
      const id = parseInt(req.params.idS);
      const projet_id = parseInt(req.params.idP);

      // query
      const { rows } = await db.query(
        "UPDATE phases SET progression = $1 WHERE id = $2 AND projet_id = $3  RETURNING *",
        [progression, id, projet_id]
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
  }

  async updatePaid(req, res) {
    try {
      // queryValidator
      const result = await this.queryValidator(req, res);
      if (result) {
        return;
      }

      // datas
      const { honoraires_paye } = req.body;
      const id = parseInt(req.params.idS);
      const projet_id = parseInt(req.params.idP);

      // query
      const { rows } = await db.query(
        "UPDATE phases SET honoraires_paye = $1 WHERE id = $2 AND projet_id = $3  RETURNING *",
        [honoraires_paye, id, projet_id]
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
  }

  async updateFees(req, res) {
    try {
      // queryValidator
      const result = await this.queryValidator(req, res);
      if (result) {
        return;
      }

      // datas
      const { honoraires } = req.body;
      const id = parseInt(req.params.idS);
      const projet_id = parseInt(req.params.idP);

      // query
      const { rows } = await db.query(
        "UPDATE phases SET honoraires = $1 WHERE id = $2 AND projet_id = $3  RETURNING *",
        [honoraires, id, projet_id]
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
  }
}

module.exports = new StageController();
