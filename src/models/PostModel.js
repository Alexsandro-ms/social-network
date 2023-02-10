const Sequelize = require("sequelize");
const connetion = require("../utils/databaseConnetion");
const UserModel = require("./UserModel");

const PostModel = connetion.define("posts", {
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imagePath: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

UserModel.hasMany(PostModel);

PostModel.sync();

module.exports = PostModel;
