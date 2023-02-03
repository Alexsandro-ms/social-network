const Sequelize = require("sequelize");
const connetion = require("../utils/databaseConnetion");
const UserModel = require("./UserModel");

const FollowerModel = connetion.define("follower", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  followerId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

UserModel.hasMany(FollowerModel, { foreignKey: "followerId", as: "followers" });
FollowerModel.belongsTo(UserModel, { foreignKey: "userId", as: "following" });

FollowerModel.sync();

module.exports = FollowerModel;
