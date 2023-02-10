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

    // Adiciona o ID do usuário logado à lista de usuários seguidos
    followers.push({ userId });

    // Definindo valores padrão para a página e limite

    const page = parseInt(req.params.page) || 1;
    const limit = parseInt(req.params.limit) || 10;

    // Utiliza o método findAndCountAll do sequelize para buscar posts e retornar o total de resultados
    const { rows: followingPosts, count } = await PostModel.findAndCountAll({
      where: { userId: followers.map((response) => response.userId) },
      order: [["createdAt", "DESC"]],
      limit,
      offset: (page - 1) * limit
    });

    // Adiciona o total de resultados à resposta HTTP
    res.set("X-Total-Count", count);

    // Envia a resposta HTTP com todos os posts
    return res.send(followingPosts);
  } catch (err) {
    // Em caso de erro, envia um status de erro HTTP 500
    return res.sendStatus(500);
  }
};

module.exports = getAllPost;
