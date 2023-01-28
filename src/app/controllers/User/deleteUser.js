const UserModel = require("../../models/UserModel");

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await UserModel.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await user.destroy();
    res.status(204).json({ message: "Successfully deleted user!" });
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = deleteUser;
