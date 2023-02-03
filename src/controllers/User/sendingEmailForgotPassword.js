const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../utils/sendEmail");
const secret_key = process.env.JWTKEY;
const UserModel = require("../../models/UserModel");

const sendingEmailForgotPassword = async (req, res) => {
  try {
    /* Localizando o usuário com e-mail fornecido. */
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    /* Gerar token de redefinição de senha. */
    const resetToken = jwt.sign({ email: user.email }, secret_key, {
      expiresIn: "15m"
    });
    /* Atualizando senha do usuário com token de redefinição */
    await UserModel.update(
      { resetPasswordToken: resetToken },
      { where: { id: user.id } }
    );
    /* Enviando e-mail com link de redefinição de senha. */
    const htmlMessage = `
    <h1>Você solicitou uma redefinição de senha. </h1>
    <p>Lembre-se, você terá <strong>15 minutos</strong> para redefinir sua senha! Passar do tempo, deverá fazer uma nova solicitação.</p>
    <p>Clique no link abaixo para redefinir sua senha:</p>
    <button><a href="http://localhost:8080/api/user/forgout-password/${resetToken}">Redefinir senha</a></button>
    `;
    /* Enviando o email de redefinição de senha. */
    await sendEmail(user.email, htmlMessage);
    /* Enviando uma mensagem ao usuário informando que o e-mail de redefinição de senha foi enviado. */
    return res.status(200).json({ message: "Password reset email sent" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Error sending password reset email" });
  }
};
module.exports = sendingEmailForgotPassword;
