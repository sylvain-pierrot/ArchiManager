const db = require("../config/database");
const bcrypt = require("bcrypt");

exports.createArchitect = async (req, res) => {
  let Validator = require("validatorjs");
  const { architect_name, architect_email, architect_password } = req.body;
  let data = { architect_name, architect_email, architect_password };
  let rules = {
    architect_name: "required|max:255",
    architect_email: "required|email|max:255",
    architect_password: "required|max:255",
  };
  let validation = new Validator(data, rules);
  if (validation.passes()) {
    const hashedPassword = await bcrypt.hash(architect_password, 10);
    const { rows } = await db.query(
      "INSERT INTO architect (architect_name, architect_email, architect_password) VALUES ($1, $2, $3)",
      [architect_name, architect_email, hashedPassword]
    );
    res.status(201).send({
      message: "Architect added successfully!",
      body: {
        architects: {
          architect_name,
          architect_email,
          hashedPassword,
        },
      },
    });
  }
};

exports.listAllArchitects = async (req, res) => {
  const response = await db.query("SELECT * FROM architect");
  res.status(200).send(response.rows);
  log.error("Failure");
};

exports.findArchitectById = async (req, res) => {
  const architect_id = parseInt(req.params.id);
  const response = await db.query(
    "SELECT * FROM architect WHERE architect_id = $1",
    [architect_id]
  );
  res.status(200).send(response.rows);
};

exports.updateArchitectById = async (req, res) => {
  const architect_id = parseInt(req.params.id);
  const { architect_name, architect_email, architect_password } = req.body;

  const response = await db.query(
    "UPDATE architect SET architect_name = $1, architect_email = $2, architect_password = $3 WHERE architect_id = $4",
    [architect_name, architect_email, architect_password, architect_id]
  );

  res.status(200).send({ message: "Product Updated Successfully!" });
};

exports.deleteArchitectById = async (req, res) => {
  const architect_id = parseInt(req.params.id);
  await db.query("DELETE FROM architect WHERE architect_id = $1", [
    architect_id,
  ]);

  res
    .status(200)
    .send({ message: "Architect deleted successfully!", architect_id });
};
