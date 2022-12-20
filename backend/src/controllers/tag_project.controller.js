const jwt = require("jsonwebtoken");
const Controller = require("./global.controller");

class Tag_projectController extends Controller {
  constructor() {
    super("tags_projets");
  }

  getAll(req, res) {
    // const query =
    //   "SELECT * FROM projets WHERE id = $1 AND architecte_id = $2";

    // data
    const foreignKey = {
      key: "projet_id",
      value: parseInt(req.params.id),
    };

    // query
    super.getAll(req, res, foreignKey);
  }

  getOne(req, res) {
    // const query =
    //   "SELECT * FROM projets WHERE id = $1 AND architecte_id = $2";

    // datas
    const primaryKey = {
      key: "tag_id",
      value: parseInt(req.params.idT),
    };
    const foreignKey = {
      key: "projet_id",
      value: parseInt(req.params.idP),
    };

    // query
    super.getOne(req, res, primaryKey, foreignKey);
  }

  create(req, res) {
    // const query =
    //   "SELECT * FROM projets WHERE id = $1 AND architecte_id = $2";

    // datas
    const foreignKey = {
      key: "projet_id",
      value: parseInt(req.params.idP),
    };
    const datas = req.body;
    const keys = Object.keys(datas);
    const values = Object.values(datas);

    // query
    super.create(req, res, foreignKey, keys, values);
  }

  delete(req, res) {
    // const query =
    //   "SELECT * FROM projets WHERE id = $1 AND architecte_id = $2";

    // datas
    const primaryKey = {
      key: "tag_id",
      value: parseInt(req.params.idT),
    };
    const foreignKey = {
      key: "projet_id",
      value: parseInt(req.params.idP),
    };

    // query
    super.delete(req, res, primaryKey, foreignKey);
  }

  update(req, res) {
    // const query =
    //   "SELECT * FROM projets WHERE id = $1 AND architecte_id = $2";

    // datas
    const primaryKey = {
      key: "tag_id",
      value: parseInt(req.params.idT),
    };
    const foreignKey = {
      key: "projet_id",
      value: parseInt(req.params.idP),
    };
    const datas = req.body;
    const keys = Object.keys(datas);
    const values = Object.values(datas);

    // query
    super.update(req, res, primaryKey, foreignKey, keys, values);
  }
}

module.exports = new Tag_projectController();
