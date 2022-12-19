const jwt = require("jsonwebtoken");
const Controller = require("./global.controller");

class ProjectController extends Controller {
  constructor() {
    super("architectes");
  }

  getAll(req, res) {
    super.get(req, res, [], []);
  }

  getOne(req, res) {
    // datas
    const id = parseInt(req.params.id);
    const data = { id: id };

    // keys && values
    const keys = Object.keys(data);
    const values = Object.values(data);

    // query
    super.get(req, res, keys, values);
  }

  create(req, res) {
    // datas
    const datas = req.body;

    // keys && values
    const keys = Object.keys(datas);
    const values = Object.values(datas);

    // query
    super.create(req, res, keys, values);
  }

  delete(req, res) {
    // data
    const id = parseInt(req.params.id);
    const datas = { id: id };

    // keys && values
    const keys = Object.keys(datas);
    const values = Object.values(datas);

    // query
    super.delete(req, res, keys, values);
  }

  update(req, res) {
    // datas
    const id = parseInt(req.params.id);
    const datas1 = req.body;
    const datas2 = {};
    datas2.id = id;

    // keys && values
    const keys = Object.keys(datas1);
    const where_keys = Object.keys(datas2);
    const values = Object.values(Object.assign({}, datas1, datas2));

    // query
    super.update(req, res, keys, where_keys, values);
  }
}

module.exports = new ProjectController();
