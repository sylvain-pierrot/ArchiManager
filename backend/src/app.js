const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Routes
const index = require("./routes/index");
const architectRoute = require("./routes/architect.routes.js");
const architectAuth = require("./routes/auth.routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "100mb" }));
app.use(
  cors({
    credentials: true,
    origin: process.env.URL || "*",
  })
);
app.use(cookieParser());

// Routes
app.use(index);
app.use("/api/", architectRoute);
app.use("/api/", architectAuth);

// const { dirname, join } = require("path");
// const { fileURLToPath } = require("url");

// const __dirname = dirname(fileURLToPath(import.meta.url));

module.exports = app;
