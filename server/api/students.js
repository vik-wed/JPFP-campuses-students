// import express router
const router = require("express").Router();
// import models to be able to access database intel for routes
const { Student, Campus } = require("../db").models;

// GET route for api/students with implemented pagination
router.get("/", async (req, res, next) => {
  try {
    const page = +req.query.page;
    const allStudents = await Student.findAll({
      include: Campus,
      order: [["id", "ASC"]],
      offset: (page - 1) * 10,
      limit: 10,
    });
    if (allStudents.length) {
      res.json(allStudents);
    } else {
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

// GET route for api/students/:studentId
router.get("/:studentId", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId, {
      include: Campus,
    });
    if (!student) {
      next(err);
    } else {
      res.json(student);
    }
  } catch (err) {
    next(err);
  }
});

// POST route for /api/students
router.post("/", async (req, res, next) => {
  try {
    res.send(await Student.create(req.body));
  } catch (err) {
    next(err);
  }
});

// PUT route for /api/students/:studentId
router.put("/:studentId", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId, {
      include: Campus,
    });
    if (!student) {
      next(err);
    } else {
      res.json(await student.update(req.body));
    }
  } catch (err) {
    next(err);
  }
});

// DELETE route /api/students/:studentId
router.delete("/:studentId", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    if (!student) {
      next(err);
    } else {
      res.send(await student.destroy());
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
