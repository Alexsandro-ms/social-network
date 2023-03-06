const Sequelize = require("sequelize");
const connetion = require("../utils/databaseConnetion");
const UserModel = require("./UserModel");

const PostModel = connetion.define("posts", {
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imagePath: {
    type: Sequelize.STRING,
    allowNull: true
  },
  likes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

UserModel.hasMany(PostModel);
PostModel.sync();
module.exports = PostModel;
