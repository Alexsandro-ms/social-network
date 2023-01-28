const PostModel = require("../../models/PostModel");
const UserModel = require("../../models/UserModel");

const getPostByUserId = async (req, res) => {
  try {
    /* Recebendo id via parâmetros. */
    const id = req.params.id;
    /* Checando se o id é um número. */
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid id." });
    }

    /* Procurando um usuário por id. */
    const user = await UserModel.findByPk(id);
    /* Caso não encontre, retornará um status 404 de usuário não encontrado. */
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    /* Procurando todos os posts apartit do id de usuário. */
    const posts = await PostModel.findAll({
      where: {
        UserId: user.id
      }
    });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = getPostByUserId;
