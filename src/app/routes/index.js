const express = require("express");

/* Criando um novo objeto de rotas. */
const router = express.Router();

/* Middlewares */
const AuthMiddleware = require("../middlewares/AuthMiddleware");

/* Controllers */
/* Postes */
const createPost = require("../controllers/Post/createPost");
const getAllPostByUserId = require("../controllers/Post/getAllPostByUserId");
const getPostDetails = require("../controllers/Post/getPostDetails");
const deletePost = require("../controllers/Post/deletePost");
const getAllPost = require("../controllers/Post/getAllPosts.js");

/* Followers */
const followUser = require("../controllers/Followers/followUser");
const unfollowUser = require("../controllers/Followers/unfollowUser");

/* Users */
const createUser = require("../controllers/User/createUser");
const getUserById = require("../controllers/User/getUserById");
const signInUser = require("../controllers/User/signinUser");
const sendingEmailForgotPassword = require("../controllers/User/sendingEmailForgotPassword");
const changePasswordUser = require("../controllers/User/changePasswordUser");
const deleteUser = require("../controllers/User/deleteUser");

/* Rotas de Usuários */
router.post("/api/user", createUser);
router.post("/api/user/signIn", signInUser);
router.get("/api/user/:id", getUserById);
router.delete("/api/user", AuthMiddleware, deleteUser);
router.post("/api/user/forgout-password", sendingEmailForgotPassword);
router.patch("/api/user/forgout-password/:token", changePasswordUser);

/* Rotas de Seguidores */
router.post("/api/follow", AuthMiddleware, followUser);
router.delete("/api/follow", AuthMiddleware, unfollowUser);

/* Rotas de postes */
router.get("/api/posts/:id", AuthMiddleware, getAllPostByUserId);
router.get("/api/posts", AuthMiddleware, getAllPost);
router.post("/api/post", AuthMiddleware, createPost);
router.get("/api/post/:postId", AuthMiddleware, getPostDetails);
router.delete("/api/post", AuthMiddleware, deletePost);

module.exports = router;
