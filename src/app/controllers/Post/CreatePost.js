const PostModel = require("../../models/PostModel");

const createPost = (req, res) => {
  /* Desestruturando variáveis ( body e userId ) recebidas pelo corpo da requisição. */
  const { body, userId } = req.body;

  /* Verificando se o corpo e o userId não estão indefinidos. */
  if (body === undefined || userId === undefined) {
    return res.status(400).json({ message: "Fill in all fields" });
  }

  /* Criando um post e retornando uma mensagem se ela foi criada ou não. */
  PostModel.create({ body, UserId: userId })
    .then((response) => {
      return res.status(201).json({ message: "Post created!" });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

module.exports = createPost;
