const PostModel = require("../../models/PostModel");
const FollowersModel = require("../../models/FollowersModel");

const getAllPost = async (req, res) => {
  try {
    // Obtém o ID do usuário logado
    const { id: userId } = req.loggedUserInfo;

    // Busca todos os usuários seguidos pelo usuário logado
    const followers = await FollowersModel.findAll({
      where: { followerId: userId },
      attributes: ["userId"],
      raw: true
    });

    // Busca todos os posts dos usuários seguidos pelo usuário logado
    const followingPosts = await PostModel.findAll({
      where: { userId: followers.map((response) => response.userId) },
      order: [["createdAt", "DESC"]]
    });

    // Envia a resposta HTTP com todos os posts
    return res.send(followingPosts);
  } catch (err) {
    // Em caso de erro, envia um status de erro HTTP 500
    return res.sendStatus(500);
  }
};

module.exports = getAllPost;
