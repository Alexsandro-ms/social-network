const Sequelize = require("sequelize");
const connection = require("../utils/databaseConnetion");
const PostModel = require("./PostModel");
const UserModel = require("./UserModel");

const LikeModel = connection.define("like", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  postId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

UserModel.belongsToMany(PostModel, { through: LikeModel });
PostModel.belongsToMany(UserModel, { through: LikeModel });

LikeModel.sync();

module.exports = LikeModel;
