const PostModel = require("../../models/PostModel");
const UserModel = require("../../models/UserModel");

const deletePost = async (req, res) => {
  const { id: userId } = req.loggedUserInfo;
  const { postId } = req.params;

  try {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const post = await PostModel.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post não encontrado." });
    }

    if (post.userId !== userId) {
      return res.status(401).json({ message: "Ação não autorizada." });
    }

    await post.destroy();
    return res.json({ message: "Post excluído com sucesso." });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = deletePost;
