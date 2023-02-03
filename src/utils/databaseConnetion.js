const { Sequelize } = require("sequelize");
require("dotenv").config();

/* Obtendo as variáveis ​​de ambiente do arquivo .env. */
const mysqlUser = process.env.MYSQLUSER;
const mysqlPassword = process.env.MYSQLPASSWORD;
const mysqlDatabase = process.env.MYSQLDATABASE;

/* Criando a conexão com banco de dados. */
const connetion = new Sequelize(mysqlDatabase, mysqlUser, mysqlPassword, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  timezone: "-03:00"
});

/* exportando conexão */
module.exports = connetion;
