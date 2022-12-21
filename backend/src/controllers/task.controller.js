const jwt = require("jsonwebtoken");
const Controller = require("./global.controller");

class TaskController extends Controller {
  constructor() {
    super("taches");
  }

  getAll(req, res) {
    // const query =
    //   "SELECT * FROM phases ph INNER JOIN projets pr ON ph.projet_id=pr.id WHERE ph.id = $1 AND pr.architecte_id = $2";

    // data
    const foreignKey = {
      key: "phase_id",
      value: parseInt(req.params.idS),
    };

    // query
    super.getAll(req, res, foreignKey);
  }

  getOne(req, res) {
    // const query =
    //   "SELECT * FROM phases ph INNER JOIN projets pr ON ph.projet_id=pr.id WHERE ph.id = $1 AND pr.architecte_id = $2";

    // datas
    const primaryKey = {
      key: "id",
      value: parseInt(req.params.idT),
    };
    const foreignKey = {
      key: "phase_id",
      value: parseInt(req.params.idS),
    };

    // query
    super.getOne(req, res, primaryKey, foreignKey);
  }

  create(req, res) {
    // const query =
    //   "SELECT * FROM phases ph INNER JOIN projets pr ON ph.projet_id=pr.id WHERE ph.id = $1 AND pr.architecte_id = $2";

    // datas
    const foreignKey = {
      key: "phase_id",
      value: parseInt(req.params.idS),
    };

    // query
    super.create(req, res, foreignKey);
  }

  delete(req, res) {
    // const query =
    //   "SELECT * FROM phases ph INNER JOIN projets pr ON ph.projet_id=pr.id WHERE ph.id = $1 AND pr.architecte_id = $2";

    // datas
    const primaryKey = {
      key: "id",
      value: parseInt(req.params.idT),
    };
    const foreignKey = {
      key: "phase_id",
      value: parseInt(req.params.idS),
    };

    // query
    super.delete(req, res, primaryKey, foreignKey);
  }

  update(req, res) {
    // const query =
    //   "SELECT * FROM phases ph INNER JOIN projets pr ON ph.projet_id=pr.id WHERE ph.id = $1 AND pr.architecte_id = $2";

    // datas
    const primaryKey = {
      key: "id",
      value: parseInt(req.params.idT),
    };
    const foreignKey = {
      key: "phase_id",
      value: parseInt(req.params.idS),
    };

    // query
    super.update(req, res, primaryKey, foreignKey);
  }
}

module.exports = new TaskController();
