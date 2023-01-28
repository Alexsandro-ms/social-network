const express = require("express");

/* Criando um novo objeto de rotas. */
const router = express.Router();

/* Middlewares */
const AuthMiddleware = require("../middlewares/AuthMiddleware");

/* Controllers */
/* Postes */
const createPost = require("../controllers/Post/createPost");
const getPostByUserId = require("../controllers/Post/getPostByUserId");

/* Users */
const createUser = require("../controllers/User/createUser");
const getUserById = require("../controllers/User/getUserById");
const signInUser = require("../controllers/User/signinUser");
const sendingEmailForgotPassword = require("../controllers/User/sendingEmailForgotPassword");
const changePasswordUser = require("../controllers/User/changePasswordUser");

/* Rotas de Usuários */
router.post("/api/user", createUser);
router.post("/api/user/signIn", signInUser);
router.get("/api/user/:id", getUserById);
router.post("/api/user/forgout-password", sendingEmailForgotPassword);
router.patch("/api/user/forgout-password/:token", changePasswordUser);

/* Rotas de postes */
router.post("/api/post", AuthMiddleware, createPost);
router.get("/api/post/:id", AuthMiddleware, getPostByUserId);

module.exports = router;
