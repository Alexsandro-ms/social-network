const PostModel = require("../../models/PostModel");
const UserModel = require("../../models/UserModel");
const LikeModel = require("../../models/LikesModel");

const LikeThis = async (req, res) => {
  try {
    const { postId } = req.body;
    const { id: userId } = req.loggedUserInfo;

    // Verifica se já existe um like com o mesmo userId e postId
    const existingLike = await LikeModel.findOne({ where: { userId, postId } });

    if (existingLike) {
      // Retorna erro 400 se já existe um like com o mesmo userId e postId
      return res
        .status(400)
        .json({ message: "You have already liked this post" });
    }

    // Cria um novo like com o userId e postId informados
    await LikeModel.create({ userId, postId });

    // Incrementa a contagem de likes do post com o postId informado
    const post = await PostModel.findByPk(postId);
    await post.increment("likes");

    // Busca pelo post com o postId informado e retorna a contagem de likes
    const likes = await post.get("likes");

    // Retorna a contagem de likes para o post
    return res.status(200).json({ likes });
  } catch (error) {
    // Retorna erro 500 em caso de erro interno
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = LikeThis;
