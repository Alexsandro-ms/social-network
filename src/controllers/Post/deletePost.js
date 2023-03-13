const PostModel = require("../../models/PostModel");
const UserModel = require("../../models/UserModel");

const deletePost = async (req, res) => {
  const { id: userId } = req.loggedUserInfo;
  const { postId } = req.params;

  try {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const post = await PostModel.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (post.userId !== userId) {
      return res.status(401).json({ message: "Not authorized." });
    }

    await post.destroy();
    return res.json({ message: "Post deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = deletePost;
