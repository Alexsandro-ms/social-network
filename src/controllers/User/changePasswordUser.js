const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/UserModel");

const JWT_SECRET = process.env.JWTKEY;

const changePassword = async (req, res) => {
  try {
    /* Obtendo o token via parâmetros e a nova senha do corpo da solicitação. */
    const token = req.params.token;
    const newPassword = req.body.newPassword;

    /* Verificando se a nova senha foi fornecida. */
    if (!newPassword) {
      return res.status(400).json({ error: "Please provide a new password" });
    }
    /* Verificando se o token foi fornecido. */
    if (!token) {
      return res.status(400).json({ error: "Invalid token" });
    }
    /* Encontrando o usuário com o resetPasswordToken que corresponde ao token que foi enviado na solicitação. */
    const user = await UserModel.findOne({
      where: { resetPasswordToken: token }
    });
    /* Verificando se o usuário existe. */
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    /* Verificando se o token é valido. */
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }
    /* Fazendo hash da nova senha e atualizando a senha do usuário no banco de dados. */
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);
    await UserModel.update({ password: hash }, { where: { id: user.id } });
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error updating password" });
  }
};

module.exports = changePassword;
