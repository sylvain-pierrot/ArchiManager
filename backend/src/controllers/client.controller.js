const jwt = require("jsonwebtoken");
const Controller = require("./global.controller");

class ClientController extends Controller {
  constructor() {
    super("clients");
  }

  getAll(req, res) {
    // data
    const architecte_id = jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET
    ).id;
    const data = { architecte_id: architecte_id };

    // keys && values
    const keys = Object.keys(data);
    const values = Object.values(data);

    // query
    super.get(req, res, keys, values);
  }

  getOne(req, res) {
    // datas
    const id = parseInt(req.params.id);
    const architecte_id = jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET
    ).id;
    const datas = { id: id, architecte_id: architecte_id };

    // keys && values
    const keys = Object.keys(datas);
    const values = Object.values(datas);

    // query
    super.get(req, res, keys, values);
  }

  create(req, res) {
    // datas
    const architecte_id = jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET
    ).id;
    const datas = req.body;
    datas.architecte_id = architecte_id;

    // keys && values
    const keys = Object.keys(datas);
    const values = Object.values(datas);

    // query
    super.create(req, res, keys, values);
  }

  delete(req, res) {
    // data
    const id = parseInt(req.params.id);
    const architecte_id = jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET
    ).id;
    const datas = { id: id, architecte_id: architecte_id };

    // keys && values
    const keys = Object.keys(datas);
    const values = Object.values(datas);

    // query
    super.delete(req, res, keys, values);
  }

  update(req, res) {
    // datas
    const id = parseInt(req.params.id);
    const architecte_id = jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET
    ).id;
    const datas1 = req.body;
    const datas2 = {};
    datas2.id = id;
    datas2.architecte_id = architecte_id;

    // keys && values
    const keys = Object.keys(datas1);
    const where_keys = Object.keys(datas2);
    const values = Object.values(Object.assign({}, datas1, datas2));

    // query
    super.update(req, res, keys, where_keys, values);
  }
}

module.exports = new ClientController();
