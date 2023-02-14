const CommentsModel = require("../../models/CommentsModel");

const createComment = async (req, res) => {
  const { id } = req.loggedUserInfo;
  const { postId, comment } = req.body;

  try {
    /* Verificando se o postId ou comentário está vazio. Se estiver vazio, retornará um código de status 400. */
    if (!postId || !comment) {
      return res.sendStatus(400);
    }

    /* Criando comentarios. */
    await CommentsModel.create({
      userId: id,
      postId,
      comment
    });

    /* Retornando status http e uma mensagem para o usuário. */
    return res.status(201).json({ message: "Comment created!" });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

module.exports = createComment;
