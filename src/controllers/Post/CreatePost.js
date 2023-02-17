const PostModel = require("../../models/PostModel");

const createPost = async (req, res) => {
  try {
    /* Destruturando o body, ID e name. */
    const { body } = req.body;
    const { id, name } = req.loggedUserInfo;

    /* Verificando se o body, ID e name são válidos. */
    if (!name || !body || !id) {
      return res.status(400).json({ message: "Fill in all fields" });
    }

    /* Checando se existe um arquivo, associando o arquivo a variável image caso exista. */
    const image = req.file?.filename;

    /* Criando novo post. */
    await PostModel.create({
      userId: id,
      userName: name,
      imagePath: image,
      body
    });

    /* Retornando um status code e uma mensagem para usuário. */
    return res.status(201).json({ message: "Post created!" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = createPost;
