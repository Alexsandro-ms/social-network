const PostModel = require("../../models/PostModel");

const createPost = (req, res) => {
  const { title, body, userId } = req.body;

  if (title != undefined && body != undefined && userId != undefined) {
    PostModel.create({ title, body, UserId: userId })
      .then((response) => {
        return res.status(201).json({ message: "Post created!" });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } else {
    return res.status(400).json({ message: "Fill in all fields" });
  }
};

module.exports = createPost;
