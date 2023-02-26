// Students model with firstName, lastName, email, imageUrl, gpa information

// import Sequelize and db connection
const Sequelize = require("sequelize");
const db = require("../database");

const Student = db.define("student", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://upload.wikimedia.org/wikipedia/commons/c/cd/Portrait_Placeholder_Square.png",
  },
  gpa: {
    type: Sequelize.DECIMAL(10, 1),
    validate: {
      min: 0.0,
      max: 4.0,
    },
  },
});

module.exports = Student;
