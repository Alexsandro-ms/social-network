const UserModel = require("../../models/UserModel");
const { Op } = require("sequelize");

const searchUser = async (req, res) => {
  try {
    /* Desestruturando a variável `name` dos parâmetros da requisição. */
    const { name } = req.params;
    /* Procurando por usuários no banco de dados com o `name` igual ao parâmetro. */
    const users = await UserModel.findAll({
      attributes: ["id", "name", "lastName", "imagePath"],
      where: {
        name: {
          [Op.like]: `${name}%`
        }
      }
    });

    /* Se o array de usuário retornado do `UserModel.findAll` estiver vazio, a api retornará um,
     status 404(not found) e uma mensagem de usuário(s) não encontrado(s) */
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    /* Caso não haja nenhum erro, retornará um status 200(Ok) e o array de usuários. */
    return res.status(200).json(users);
  } catch (err) {
    /* Retornando um código de status 500 com uma mensagem e o objeto de erro. */
    return res.status(500).json({ message: "An error occurred.", err });
  }
};

module.exports = searchUser;
