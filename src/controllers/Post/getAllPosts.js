const PostModel = require("../../models/PostModel");
const FollowersModel = require("../../models/FollowersModel");

const getAllPost = async (req, res) => {
  try {
    const userId = req.loggedUserInfo.id; // Obtém o ID do usuário logado
    // Busca todos os usuários seguidos pelo usuário logado
    const followers = await FollowersModel.findAll({
      where: { followerId: userId },
      attributes: ["userId"],
      raw: true
    });

    followers.push({ userId }); // Adiciona o ID do usuário logado à lista de usuários seguidos

    /* Obtendo o userId do array de seguidores. */
    const followerIds = followers.map((follower) => follower.userId);

    /* Definindo limites e página. */
    const page = parseInt(req.params.page) || 1;
    const limit = parseInt(req.params.limit) || 10;

    /* Desetruturando posts dos seguidores e quantidade */
    const { rows: followingPosts, count } = await PostModel.findAndCountAll({
      where: { userId: followerIds },
      order: [["createdAt", "DESC"]],
      limit,
      offset: (page - 1) * limit
    });

    // Adiciona o total de resultados à resposta HTTP
    res.set("X-Total-Count", count);
    /* Enviando a resposta HTTP com os posts. */
    return res.send(followingPosts);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

module.exports = getAllPost;
