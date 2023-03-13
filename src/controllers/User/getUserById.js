const UserModel = require("../../models/UserModel");

const getUserById = async (req, res) => {
  try {
    /* Verificando se o id é um número. */
    if (isNaN(req.params.id)) {
      /* Retornando código de status (400) e uma mensagem para usuário. */
      return res.status(400).json({ message: "Invalid ID." });
    }

    /* Obtendo o usuário pelo id. */
    const id = req.params.id;
    const user = await UserModel.findByPk(id, {
      attributes: ["createdAt", "imagePath", "lastName", "name"]
    });

    /* Se o usuário não for encontrado, retornará um código de status 404 e uma mensagem para o usuário. */
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    /* Retornando o objeto de usuário para o cliente. */
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "An error occurred.", err });
  }
};

module.exports = getUserById;
