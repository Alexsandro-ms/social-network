const connetion = require("../utils/databaseConnetion");
const UserModel = require("./UserModel");

const FollowerModel = connetion.define("follower", {});

UserModel.belongsToMany(UserModel, {
  through: FollowerModel,
  as: "followers",
  foreignKey: "followerId"
});
UserModel.belongsToMany(UserModel, {
  through: FollowerModel,
  as: "following",
  foreignKey: "followingId"
});

FollowerModel.sync({ force: true });

module.exports = FollowerModel;
