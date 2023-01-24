const UserModel = require("../../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signInUser = (req, res) => {
  /* Recebendo email e senha do corpo da requisição. */
  const { email, password } = req.body;

  /* Verificando se o e-mail e a senha não estão vazios. */
  if (email.length && password.length != 0) {
    /* Procurando um usuário com o e-mail que foi enviado no corpo da solicitação. */
    UserModel.findOne({
      where: {
        email
      }
    })
      .then((user) => {
        /* Verificando se o usuário existe. */
        if (user != undefined) {
          const validationPassword = bcrypt.compareSync(
            password,
            user.password
          );

          /* Verificando se a senha enviada no corpo da requisição, e a cadastrada no banco de dados são a mesma. */
          if (validationPassword) {
            /* Obtendo o JWTKEY ​​do arquivo .env. */
            const jwtKey = process.env.JWTKEY;
            /* Criando um token com o nome e email do usuário. */
            jwt.sign(
              { name: user.name, email: user.email },
              jwtKey,
              {
                expiresIn: "48h"
              },
              (err, token) => {
                /*
                 * Verificando se há um erro no token.
                 * Se houver um erro retornara uma mensagem com o erro.
                 * Caso não tenha, retornara uma mensagem e um token.
                 */
                if (err) {
                  return res.status(500).json({ message: err });
                } else {
                  return res
                    .status(200)
                    .json({ message: "User successfully logged in!", token });
                }
              }
            );
          } else {
            return res.status(400).json({ message: "Incorrect password." });
          }
        } else {
          /* Caso o usuário não seja encontrado, retornará uma mensagem informando que o usuário não foi encontrado. */
          return res.status(400).json({ message: "User not found." });
        }
      })
      .catch((err) => {
        /* Retornando a mensagem de erro para o usuário, caso tenha um erro interno do servidor. */
        return res.status(500).json({ message: err });
      });
  } else {
    /* Retornando uma mensagem ao usuário informando que os campos estão vazios. */
    return res.status(400).json({ message: "Fill in all fields." });
  }
};

module.exports = signInUser;
