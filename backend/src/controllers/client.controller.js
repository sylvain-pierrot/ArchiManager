const jwt = require("jsonwebtoken");
const Controller = require("./global.controller");

class ClientController extends Controller {
  constructor() {
    super("clients");
  }

  getAll(req, res) {
    // data
    const foreignKey = {
      key: "architecte_id",
      value: jwt.verify(req.cookies.token, process.env.JWT_SECRET).id,
    };

    // query
    super.getAll(req, res, foreignKey);
  }

  getOne(req, res) {
    // datas
    const primaryKey = {
      key: "id",
      value: parseInt(req.params.id),
    };
    const foreignKey = {
      key: "architecte_id",
      value: jwt.verify(req.cookies.token, process.env.JWT_SECRET).id,
    };

    // query
    super.getOne(req, res, primaryKey, foreignKey);
  }

  create(req, res) {
    // datas
    const foreignKey = {
      key: "architecte_id",
      value: jwt.verify(req.cookies.token, process.env.JWT_SECRET).id,
    };
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
    const foreignKey = {
      key: "architecte_id",
      value: jwt.verify(req.cookies.token, process.env.JWT_SECRET).id,
    };

    // query
    super.delete(req, res, primaryKey, foreignKey);
  }

  update(req, res) {
    // datas
    const primaryKey = {
      key: "id",
      value: parseInt(req.params.id),
    };
    const foreignKey = {
      key: "architecte_id",
      value: jwt.verify(req.cookies.token, process.env.JWT_SECRET).id,
    };
    const datas = req.body;
    const keys = Object.keys(datas);
    const values = Object.values(datas);

    // query
    super.update(req, res, primaryKey, foreignKey, keys, values);
  }
}

module.exports = new ClientController();
