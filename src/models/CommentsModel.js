const Sequelize = require("sequelize");
const connetion = require("../utils/databaseConnetion");
const PostModel = require("./PostModel");
const UserModel = require("./UserModel");

const CommentsModel = connetion.define("comments", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  comment: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

UserModel.hasMany(CommentsModel);
PostModel.hasMany(CommentsModel);

CommentsModel.sync();

module.exports = CommentsModel;
