const express = require("express");
require("dotenv").config();
const router = require("./app/routes");
const connetion = require("./app/utils/databaseConnetion");
const cors = require("cors");

/* Iniciando a conexão com o banco de dados. */
connetion
  .authenticate()
  .then(() => {
    /* Instanciando o framework express a variável app. */
    const app = express();

    /* Definindo a porta como 8080 se a variável de ambiente PORT não estiver definida. */
    const PORT = process.env.PORT || 8080;

    app.use(cors());
    app.use(express.json());

    /* Definindo as rotas do site. */
    app.use(router);

    console.log("Connection has been established successfully.");
    app.listen(PORT, console.log("server is running on port", PORT));
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });
