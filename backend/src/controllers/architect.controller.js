const jwt = require("jsonwebtoken");
const Controller = require("./global.controller");

class ArchitectController extends Controller {
  constructor() {
    super("architectes");
  }

  getAll(req, res) {
    super.getAll(req, res, null);
  }

  getOne(req, res) {
    // datas
    const primaryKey = {
      key: "id",
      value: parseInt(req.params.id),
    };
    const foreignKey = null;

    // query
    super.getOne(req, res, primaryKey, foreignKey);
  }

  create(req, res) {
    // datas
    const foreignKey = null;
    const datas = req.body;
    const keys = Object.keys(datas);
    const values = Object.values(datas);

    // query
    super.create(req, res, foreignKey, keys, values);
  }

  delete(req, res) {
    // datas
    const primaryKey = {
      key: "id",
      value: parseInt(req.params.id),
    };
    const foreignKey = null;

    // query
    super.delete(req, res, primaryKey, foreignKey);
  }

  update(req, res) {
    // datas
    const primaryKey = {
      key: "id",
      value: parseInt(req.params.id),
    };
    const foreignKey = null;
    const datas = req.body;
    const keys = Object.keys(datas);
    const values = Object.values(datas);

    // query
    super.update(req, res, primaryKey, foreignKey, keys, values);
  }
}

module.exports = new ArchitectController();
