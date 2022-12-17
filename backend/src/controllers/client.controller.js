const db = require("../config/database");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.createClient = async (req, res) => {
  try {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // datas
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const architecte_id = decodedToken.id;
    const { nom, nom_contact, email, adresse, telephone, notes } = req.body;

    // query
    const { rows } = await db.query(
      "INSERT INTO clients (nom, nom_contact, email, adresse, telephone, notes, architecte_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [nom, nom_contact, email, adresse, telephone, notes, architecte_id]
    );

    // failed query
    if (rows.length < 1) {
      return res.status(401).json({ message: "Create client error" });
    }

    // success query
    const newClient = rows[0];
    res.status(201).json(newClient);
  } catch (err) {
    // server error
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.listAllClients = async (req, res) => {
  try {
    // data
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const architecte_id = decodedToken.id;

    // query
    const { rows } = await db.query(
      "SELECT * FROM clients WHERE architecte_id = $1",
      [architecte_id]
    );

    // failed query
    if (rows.length < 1) {
      return res.status(401).json({ message: "Clients not found or error" });
    }

    // success
    res.status(200).send(rows);
  } catch (err) {
    // server error
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.findClientById = async (req, res) => {
  try {
    // datas
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const architecte_id = decodedToken.id;
    const id = parseInt(req.params.id);

    // query
    const { rows } = await db.query(
      "SELECT * FROM clients WHERE id = $1 AND architecte_id = $2",
      [id, architecte_id]
    );

    // failed query
    if (rows.length < 1) {
      return res.status(401).send("Client not found or error");
    }

    // success query
    res.status(200).send(rows);
  } catch (err) {
    // server error
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateClientById = async (req, res) => {
  try {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // datas
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const architecte_id = decodedToken.id;
    const { nom, nom_contact, email, adresse, telephone, notes } = req.body;
    const id = req.params.id;

    // query
    const { rows } = await db.query(
      "UPDATE clients SET nom = $1, nom_contact = $2, email = $3, adresse = $4, telephone = $5, notes = $6 WHERE id = $7 AND architecte_id = $8 RETURNING *",
      [nom, nom_contact, email, adresse, telephone, notes, id, architecte_id]
    );

    // failed query
    if (rows.length < 1) {
      return res.status(401).send("Error update client");
    }

    // success
    const updatedClient = rows[0];
    res.status(200).json(updatedClient);
  } catch (err) {
    // server error
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteClientById = async (req, res) => {
  // data
  const token = req.cookies.token;
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const architecte_id = decodedToken.id;
  const id = parseInt(req.params.id);

  // query
  await db.query("DELETE FROM clients WHERE id = $1 AND architecte_id = $2", [
    id,
    architecte_id,
  ]);

  // failed query: idk how catch

  // success query
  res.json({ message: "Client deleted successfully" });
};
