// Campus model with name, imageUrl, address and description information

// import Sequelize and db connection
const Sequelize = require("sequelize");
const db = require("../database");

const Campus = db.define("campus", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Castle_Arenberg%2C_Katholieke_Universiteit_Leuven_adj.jpg/640px-Castle_Arenberg%2C_Katholieke_Universiteit_Leuven_adj.jpg",
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Campus;
