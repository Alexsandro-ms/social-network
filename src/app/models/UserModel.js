const { Sequelize } = require("sequelize");

const UserModel = new Sequelize.define("Users", {
  name: {
    type: String,
    allowNull: false
  },
  lastName: {
    type: String,
    allowNull: false
  },
  email: {
    type: String,
    allowNull: false
  },
  password: {
    type: String,
    allowNull: false
  }
});

UserModel.sync();

module.exports = UserModel;
