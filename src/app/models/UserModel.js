const Sequelize = require("sequelize");
const connetion = require("../utils/databaseConnetion");

const UserModel = connetion.define("Users", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

UserModel.sync();

module.exports = UserModel;
