const PostModel = require("../../models/PostModel");

const getPostDetails = async (req, res) => {
  /* Recupera o ID do post a partir dos parâmetros da requisição.*/
  const { postId } = req.params;
  try {
    /* Verifica se o ID é inválido ou não foi fornecido. */
    if (!postId || isNaN(postId)) {
      return res.status(404).json({ message: "Post não encontrado!" });
    }
    /* Busca o post pelo ID, */
    const post = await PostModel.findByPk(postId);

    /* Verifica se o post foi encontrado. */
    if (!post) {
      return res.status(404).json({ message: "Post não encontrado!" });
    }

    /* Retorna o post com status 200 (sucesso). */
    return res.status(200).json(post);
  } catch (error) {
    /* Retorna status 500 (erro interno do servidor) em caso de erro. */
    return res.sendStatus(500);
  }
};

module.exports = getPostDetails;
