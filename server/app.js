const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

// static middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes mounted on /api
app.use("/api", require("./api"));

// additional middleware
app.use(cors());
app.use(morgan("dev"));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
