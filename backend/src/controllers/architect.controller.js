const db = require("../config/database");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.createArchitect = async (req, res) => {
  try {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // datas
    const { numero_national, nom, prenom, email, mot_de_passe, telephone } =
      req.body;
    const mot_de_passe_hashe = await bcrypt.hash(mot_de_passe, 10);

    // query
    const { rows } = await db.query(
      "INSERT INTO architectes (numero_national, nom, prenom, email, mot_de_passe, telephone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [numero_national, nom, prenom, email, mot_de_passe_hashe, telephone]
    );

    // failed query
    if (rows.length < 1) {
      return res.status(401).json({ message: "Create architect error" });
    }

    // success query
    const newArchitect = rows[0];
    res.status(201).json(newArchitect);
  } catch (err) {
    // server error
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.listAllArchitects = async (req, res) => {
  try {
    // query
    const { rows } = await db.query("SELECT * FROM architectes");

    // failed query
    if (rows.length < 1) {
      return res.status(401).json({ message: "List all architects error" });
    }

    // success
    res.status(200).send(rows);
  } catch (err) {
    // server error
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.findArchitectById = async (req, res) => {
  try {
    // data
    const id = parseInt(req.params.id);

    // query
    const { rows } = await db.query("SELECT * FROM architectes WHERE id = $1", [
      id,
    ]);

    // failed query
    if (rows.length < 1) {
      return res.status(401).send("Not architect found");
    }

    // success query
    res.status(200).send(rows);
  } catch (err) {
    // server error
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateArchitectById = async (req, res) => {
  try {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // datas
    const { numero_national, nom, prenom, email, telephone } = req.body;
    const id = req.params.id;

    // query
    const { rows } = await db.query(
      "UPDATE architectes SET numero_national = $1, nom = $2, prenom = $3, email = $4, telephone = $5 WHERE id = $6 RETURNING *",
      [numero_national, nom, prenom, email, telephone, id]
    );

    // failed query
    if (rows.length < 1) {
      return res.status(401).send("Error update architect");
    }

    // success
    const updatedArchitect = rows[0];
    res.status(200).json(updatedArchitect);
  } catch (err) {
    // server error
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteArchitectById = async (req, res) => {
  // data
  const id = parseInt(req.params.id);

  // query
  const { rows } = await db.query("DELETE FROM architectes WHERE id = $1", [
    id,
  ]);

  // failed query: idk how catch

  // success query
  res.json({ message: "Architect deleted successfully" });
};
