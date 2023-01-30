const UserModel = require("../../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWTKEY;

const signInUser = async (req, res) => {
  try {
    /* Desestruturando o e-mail e a senha do corpo da solicitação. */
    const { email, password } = req.body;

    /* Validação que verifica se o usuário preencheu todos os campos. */
    if (!email || !password) {
      return res.status(400).json({ message: "Fill in all fields." });
    }

    /* Procurando um usuário no banco de dados com o e-mail que foi enviado no corpo da solicitação. */
    const user = await UserModel.findOne({ where: { email } });

    /* Verificando se exite um usuário no banco de dados, caso não exista, 
    retornara status de erro, e mensagem.*/
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    /* Comparando a senha que o usuário enviou no corpo da solicitação 
    com a senha que está armazenada no banco de dados. */
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    /* Verificando se a senha é válida, se não for
    retornará uma mensagem de erro */
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    /* Criando um token para o usuário, com expiração de 48 horas e 
    assinando nome e email no payload do token. */
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      jwtKey,
      {
        expiresIn: "48h"
      }
    );

    /* Retornando um status de 200 (solicitação foi bem-sucedida), uma mensagem e um token. */
    return res
      .status(200)
      .json({ message: "User successfully logged in!", token });
  } catch (err) {
    /* Retornando um status de 500 (erro interno do servidor) e uma mensagem de err. */
    return res.status(500).json({ message: err });
  }
};

module.exports = signInUser;
