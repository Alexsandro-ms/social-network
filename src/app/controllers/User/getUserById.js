const UserModel = require("../../models/UserModel");

const getUserById = (req, res) => {
  if (isNaN(req.params.id)) {
  } else {
    const id = req.params.id;
    UserModel.findByPk({
      where: {
        id
      }
    })
      .then((user) => {
        return res.status(200).json(user);
      })
      .catch((err) => {
        return res.status(500).json({ message: "User does not exist.", err });
      });
  }
};

module.exports = getUserById;
