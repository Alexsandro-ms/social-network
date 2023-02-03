const FollowerModel = require("../../models/FollowersModel");

const unfollowUser = async (req, res) => {
  const { id: followerId } = req.loggedUserInfo;
  const { followingId } = req.body;

  if (!followerId || !followingId) {
    return res
      .status(400)
      .json({ message: "Both followerId and followingId are required." });
  }

  if (followerId === followingId) {
    return res.status(400).json({ message: "Can't unfollow yourself." });
  }

  try {
    const follow = await FollowerModel.findOne({ where: { followerId } });

    if (!follow) {
      return res.status(400).json({ message: "Not following." });
    }

    await FollowerModel.destroy({ where: { followerId, followingId } });

    return res.status(200).json({ message: "Successfully unfollowed." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unfollow failed." });
  }
};

module.exports = unfollowUser;
