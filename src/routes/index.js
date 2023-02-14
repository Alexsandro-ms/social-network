const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

/* Criando um novo objeto de rotas. */
const router = express.Router();

/* Criando uma pasta chamada uploads no diretório raiz do projeto, caso não haja uma. */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.resolve(__dirname, "../../uploads/");

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

/* Middleware de upload de imagem. */
const upload = multer({ storage }).single("image");

/* Middlewares */
const AuthMiddleware = require("../middlewares/AuthMiddleware");

/* Controllers */
/* Comments */
const createComment = require("../controllers/Comments/CreateComment");

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
const deleteUser = require("../controllers/User/deleteUser");

const changePasswordUser = require("../controllers/User/changePasswordUser");
const sendingEmailForgotPassword = require("../controllers/User/sendingEmailForgotPassword");

/* Rotas de Usuários */
router.post("/api/user", upload, createUser);
router.post("/api/user/signIn", signInUser);
router.get("/api/user/:id", getUserById);
router.delete("/api/user", AuthMiddleware, deleteUser);
router.post("/api/user/forgout-password", sendingEmailForgotPassword);
router.patch("/api/user/forgout-password/:token", changePasswordUser);

/* Rotas de Seguidores */
router.post("/api/follow", AuthMiddleware, followUser);
router.delete("/api/follow", AuthMiddleware, unfollowUser);

/* Rotas de Postes */
router.get("/api/posts/:id", AuthMiddleware, getAllPostByUserId);
router.get("/api/posts/:page/:limit", AuthMiddleware, getAllPost);
router.post("/api/post", AuthMiddleware, upload, createPost);
router.get("/api/post/:postId", AuthMiddleware, getPostDetails);
router.delete("/api/post", AuthMiddleware, deletePost);

/* Rotas de Comentarios */
router.post("/api/comment", AuthMiddleware, createComment);

module.exports = router;
