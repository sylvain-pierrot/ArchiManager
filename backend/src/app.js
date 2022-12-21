const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Routes
const index = require("./routes/index");
const stageRoute = require("./routes/stage.routes");
const tag_projectRoute = require("./routes/tag_project.routes");
const fileRoute = require("./routes/file.routes");
const statusRoute = require("./routes/status.routes");
const providerRoute = require("./routes/provider.routes");
const tagRoute = require("./routes/tag.routes");
const projectRoute = require("./routes/project.routes");
const clientRoute = require("./routes/client.routes");
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
app.use("/api/", stageRoute);
app.use("/api/", tag_projectRoute);
app.use("/api/", fileRoute);
app.use("/api/", statusRoute);
app.use("/api/", providerRoute);
app.use("/api/", tagRoute);
app.use("/api/", projectRoute);
app.use("/api/", clientRoute);
app.use("/api/", architectRoute);
app.use("/api/", architectAuth);

// const { dirname, join } = require("path");
// const { fileURLToPath } = require("url");

// const __dirname = dirname(fileURLToPath(import.meta.url));

module.exports = app;
