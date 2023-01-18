const express = require("express");
require("dotenv").config();

const connetion = require("./app/utils/databaseConnetion");

/* Iniciando a conexão com o banco de dados. */
connetion
  .authenticate()
  .then(() => {
    const app = express();
    const PORT = process.env.PORT || 8080;

    console.log("Connection has been established successfully.");
    app.listen(PORT, console.log("server is running on port", PORT));
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });
