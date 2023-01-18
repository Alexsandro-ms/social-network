const UserModel = require("../../models/UserModel");
const bcryt = require("bcrypt");

const createUser = (req, res) => {
  const { name, lastName, email, password } = req.body;
  if (
    name.length != 0 &&
    lastName.length != 0 &&
    email.length != 0 &&
    password.length != 0
  ) {
    UserModel.findOne({
      where: {
        email
      }
    }).then((user) => {
      const salt = bcryt.genSaltSync(10);
      const hash = bcryt.hashSync(password, salt);
      if (user == undefined) {
        UserModel.create({
          name,
          lastName,
          email,
          password: hash
        })
          .then((user) => {
            return res.status(201).json({ message: "User created!" });
          })
          .catch((err) => {
            return res.status(500).json({ message: err });
          });
      } else {
        return res.status(400).json({ message: "User already exists." });
      }
    });
  } else {
    return res.status(400).json({ message: "Fill in all fields." });
  }
};

module.exports = createUser;
