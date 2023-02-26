// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:
const db = require("./database");
//import Campus Model & Student model
const Campus = require("./models/Campus");
const Student = require("./models/Student");

// Students may be associated with at most one campus.
Student.belongsTo(Campus);
//Likewise, campuses may be associated with many students
Campus.hasMany(Student);

module.exports = {
  db,
  models: {
    Campus,
    Student,
  },
};
