const { Pool } = require("pg");
const dotenv = require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("Data base connect with success!");
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
