const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const mailtrapUser = process.env.MAILTRAPUSER;
const mailtrapPassword = process.env.MAILTRAPPASSWORD;
const secret_key = process.env.JWTKEY;

// Configuração do servidor SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: mailtrapUser,
    pass: mailtrapPassword
  }
});

// Função para enviar e-mail com link de redefinição de senha
async function sendEmail(email, message) {
  // Configuração do e-mail
  const mailOptions = {
    from: '"Sun Network" <noreply@sunNetwork.com>',
    to: email,
    subject: "Redefinição de senha",
    html: message
  };

  // Enviando o e-mail
  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
