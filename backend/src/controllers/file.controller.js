const db = require("../config/database");
const jwt = require("jsonwebtoken");
const Controller = require("./global.controller");

class FileController extends Controller {
  constructor() {
    super("fichiers");
  }

  async getAll(req, res) {
    try {
      // data
      const id = parseInt(req.params.id);
      const architecte_id = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      ).id;
      const data = { projet_id: id };

      // query
      const { rows } = await db.query(
        "SELECT * FROM projets WHERE id = $1 AND architecte_id = $2",
        [id, architecte_id]
      );
      // failed query
      if (rows.length < 1) {
        return res.status(403).json({ message: "Forbidden" });
      }

      // success
      super.get(req, res, Object.keys(data), Object.values(data));
    } catch (error) {
      // server error
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getOne(req, res) {
    try {
      // data
      const idP = parseInt(req.params.idP);
      const idF = parseInt(req.params.idF);
      const architecte_id = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      ).id;
      const datas = { id: idF, projet_id: idP };

      // query
      const { rows } = await db.query(
        "SELECT * FROM projets WHERE id = $1 AND architecte_id = $2",
        [idP, architecte_id]
      );
      // failed query
      if (rows.length < 1) {
        return res.status(403).json({ message: "Forbidden" });
      }

      // success
      super.get(req, res, Object.keys(datas), Object.values(datas));
    } catch (error) {
      // server error
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async create(req, res) {
    // data
    const id = parseInt(req.params.id);
    const architecte_id = jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET
    ).id;
    const datas = req.body;
    datas.projet_id = id;

    // query
    const { rows } = await db.query(
      "SELECT * FROM projets WHERE id = $1 AND architecte_id = $2",
      [id, architecte_id]
    );
    // failed query
    if (rows.length < 1) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // keys && values
    const keys = Object.keys(datas);
    const values = Object.values(datas);

    // query
    super.create(req, res, keys, values);
  }

  async delete(req, res) {
    // data
    const idP = parseInt(req.params.idP);
    const idF = parseInt(req.params.idF);
    const architecte_id = jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET
    ).id;
    const datas = { id: idF, projet_id: idP };

    // query
    const { rows } = await db.query(
      "SELECT * FROM projets WHERE id = $1 AND architecte_id = $2",
      [idP, architecte_id]
    );
    // failed query
    if (rows.length < 1) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // keys && values
    const keys = Object.keys(datas);
    const values = Object.values(datas);

    // query
    super.delete(req, res, keys, values);
  }

  async update(req, res) {
    // data
    const idP = parseInt(req.params.idP);
    const idF = parseInt(req.params.idF);
    const architecte_id = jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET
    ).id;
    const datas1 = req.body;
    const datas2 = { id: idF, projet_id: idP };

    // query
    const { rows } = await db.query(
      "SELECT * FROM projets WHERE id = $1 AND architecte_id = $2",
      [idP, architecte_id]
    );
    // failed query
    if (rows.length < 1) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // keys && values
    const keys = Object.keys(datas1);
    const where_keys = Object.keys(datas2);
    const values = Object.values(Object.assign({}, datas1, datas2));

    // query
    super.update(req, res, keys, where_keys, values);
  }
}

module.exports = new FileController();
