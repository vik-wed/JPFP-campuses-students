// import express router
const router = require("express").Router();
// import models to be able to access database intel for routes
const { Campus, Student } = require("../db").models;

// GET route for /api/campuses, including implemented pagination
router.get("/", async (req, res, next) => {
  try {
    const page = +req.query.page;
    const allCampuses = await Campus.findAll({
      include: Student,
      order: [["id", "ASC"]],
      offset: (page - 1) * 10,
      limit: 10,
    });
    if (allCampuses.length) {
      res.json(allCampuses);
    } else {
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

// GET route for /api/campuses/:campusId
router.get("/:campusId", async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.campusId, {
      include: Student,
    });
    if (!campus) {
      next(err);
    } else {
      res.json(campus);
    }
  } catch (err) {
    next(err);
  }
});

// POST route for /api/campuses
router.post("/", async (req, res, next) => {
  try {
    res.json(await Campus.create(req.body));
  } catch (err) {
    next(err);
  }
});

// PUT route for /api/campuses/:campusId
router.put("/:campusId", async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.campusId, {
      include: Student,
    });
    if (!campus) {
      next(err);
    } else {
      res.json(await campus.update(req.body));
    }
  } catch (err) {
    next(err);
  }
});

// DELETE route /api/campuses/:campusId
router.delete("/:campusId", async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.campusId);
    if (!campus) {
      next(err);
    } else {
      res.send(await campus.destroy());
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
