"use strict";

const router = require("express").Router();

//use route for /api/campuses
router.use("/campuses", require("./campuses"));
//use route for /api/students
router.use("/students", require("./students"));

// use route for throwing an error if the API route hasn't been found
router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

// error handler that catches all errors and redirects to a /404 page
router.use((err, req, res, next) => {
  console.error(err);
  res.redirect("/404");
});

module.exports = router;
