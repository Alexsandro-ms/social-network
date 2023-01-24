const PostModel = require("../../models/PostModel");
const UserModel = require("../../models/UserModel");

const getPostByUserId = (req, res) => {
  const id = req.params.id;
  UserModel.findByPk(id)
    .then((user) => {
      const UserId = user.id;
      if (UserId != undefined) {
        PostModel.findAll({
          where: {
            UserId
          }
        })
          .then((post) => {
            return res.status(200).json(post);
          })
          .catch((err) => {
            return res.status(500).json(err);
          });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => res.send(err));
};

module.exports = getPostByUserId;
