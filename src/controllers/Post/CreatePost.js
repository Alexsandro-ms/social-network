const PostModel = require("../../models/PostModel");

const createPost = async (req, res) => {
  try {
    /* Desetruturando body e userId. */
    const { body } = req.body;
    const { id: userId, name } = req.loggedUserInfo;

    /* Verificando se o body e o userId são validos. */
    if (!name || !body || !userId) {
      return res.status(400).json({ message: "Fill in all fields" });
    }

    const image = req.file?.filename;

    /* Criando novo post. */
    await PostModel.create({
      userName: name,
      imagePath: image,
      body,
      UserId: userId
    });

    return res.status(201).json({ message: "Post created!" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = createPost;
