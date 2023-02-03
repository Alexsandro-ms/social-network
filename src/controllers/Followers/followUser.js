const FollowerModel = require("../../models/FollowersModel");

const followUser = async (req, res) => {
  /* Recebendo id apartir do payload de usuário logado. */
  const { id: userId } = req.loggedUserInfo;
  /* Recebendo followerId do corpo da requisição. */
  const { followerId } = req.body;

  /* Retornando um erro e uma mensagem, se o followerId ou o followerId estiverem ausentes. */
  if (!userId || !followerId) {
    return res
      .status(400)
      .json({ message: "Both followerId and followerId are required." });
  }

  /* Se o followerId for o mesmo que o followerId, retorne uma resposta 500 Internal Server Error. */
  if (userId === followerId) {
    return res
      .status(400)
      .json({ message: "It is not possible for a user to follow himself." });
  }

  try {
    /* Tente encontrar uma relação de seguimento entre o followerId e o followerId no modelo Follower */
    const follow = await FollowerModel.findOne({ where: { followerId } });

    /* Se uma relação de seguimento já existir, retorne uma resposta 400 Bad Request com uma mensagem */
    if (follow) {
      // return res.status(400).json({ message: "Already following." });
      return res.status(400).json({ message: "Already following." });
    }

    /* Se uma relação de seguimento não existir, crie uma no modelo Follower */
    await FollowerModel.create({ userId, followerId });
    /* Retorne uma resposta 200 OK com uma mensagem indicando que o usuário foi seguido com sucesso */
    return res.status(200).json({ message: "Successfully followed user." });
  } catch (error) {
    /* Se ocorrer um erro, registre o erro no console e retorne uma resposta 500 Internal Server Error com uma mensagem */
    console.error(error);
    return res.status(500).json({ message: "Failed to follow user." });
  }
};

// Exporte a função followUser
module.exports = followUser;
