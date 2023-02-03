const UserModel = require("../../models/UserModel");
const PostModel = require("../../models/PostModel");

const deleteUser = (req, res) => {
  /* Encontrando o usuário pelo id recebido via parâmetros. */
  UserModel.findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found.");
      }
      /* Deletando usuário. */
      return user.destroy();
    })
    .then(() => {
      /* Deletando posts associado ao usuário */
      return PostModel.destroy({
        where: {
          userId: req.params.id
        }
      });
    })
    .then(() => {
      res.send("Successfully deleted user!");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
module.exports = deleteUser;
