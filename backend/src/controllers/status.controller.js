const jwt = require("jsonwebtoken");
const Controller = require("./global.controller");

class StatusController extends Controller {
  constructor() {
    super("statuts");
  }

  getAll(req, res) {
    // datas
    const foreignKey = null;

    // query
    super.getAll(req, res, foreignKey);
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

    // query
    super.create(req, res, foreignKey);
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

    // query
    super.update(req, res, primaryKey, foreignKey);
  }
}

module.exports = new StatusController();
