const PostModel = require("../../models/PostModel");
const UserModel = require("../../models/UserModel");

const deletePost = async (req, res) => {
  /*  Recupera o ID do usuário logado a partir das informações fornecidas na requisição. */
  const userId = req.loggedUserInfo.id;

  try {
    /* Procura o usuário pelo ID. */
    const user = await UserModel.findByPk(userId);
    /* Se o usuário não for encontrado, retorna erro 404. */
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    /* Procura o post pelo ID. */
    const post = await PostModel.findByPk(req.params.id);
    /* Se o post não for encontrado, retorna erro 404. */
    if (!post) {
      return res.status(404).json({ message: "Post não encontrado." });
    }

    /* Se o post não pertence ao usuário logado, retorna erro 401. */
    if (post.userId !== userId) {
      return res.status(401).json({ message: "Ação não autorizada." });
    }

    /* Exclui o post */
    await post.destroy();
    /* Retorna mensagem de sucesso na exclusão. */
    return res.json({ message: "Post excluído com sucesso." });
  } catch (error) {
    /* Em caso de erro, retorna erro 500. */
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = deletePost;
