const express = require("express");
/* Criando um novo objeto de rotas. */
const router = express.Router();

/* Controllers */
const createUser = require("../controllers/User/createUser");
const getUserById = require("../controllers/User/getUserById");

/* Rotas de Usuários */
router.post("/api/user", createUser);
router.get("/api/user/:id", getUserById);

module.exports = router;
