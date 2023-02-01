const PostModel = require("../../models/PostModel");

const createPost = async (req, res) => {
  try {
    /* Desetruturando body e userId. */
    const { body } = req.body;
    const { id: userId } = req.loggedUserInfo;

    /* Verificando se o body e o userId são validos. */
    if (!body || !userId) {
      return res.status(400).json({ message: "Fill in all fields" });
    }

    /* Criando novo post. */
    await PostModel.create({ body, UserId: userId });

    return res.status(201).json({ message: "Post created!" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = createPost;
