const UserModel = require("../../models/UserModel");
const bcryt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    /* Verificando se o usuário fez upload de uma imagem. Se o usuário fez upload de uma imagem, 
    ele salvará o nome da imagem na variável `imagePath`. */
    const image = req.file?.filename;
    /* Desestruturando variáveis recebidas no corpo da solicitação. */
    const { name, lastName, email, password } = req.body;

    /* Verificando se o usuário preencheu todos os campos. */
    if (!name || !lastName || !email || !password) {
      return res.status(400).json({ message: "Fill in all fields." });
    }

    /* Verificando se o usuário já existe no banco de dados. */
    const existingUser = await UserModel.findOne({ where: { email } });

    /* Se existir um usuário no banco de dados, retornará um status (400) e 
    uma mensagem de usuário existente */
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    /* Criptografando a senha. */
    const salt = bcryt.genSaltSync(10);
    const hash = bcryt.hashSync(password, salt);

    /* Criando um novo usuário no banco de dados. */
    await UserModel.create({
      imagePath: image,
      name,
      lastName,
      email,
      password: hash
    });

    /* Retornando um código de status (201) e uma mensagem para o usuário. */
    return res.status(201).json({ message: "User created!" });
  } catch (err) {
    /* Retornando um código de status (500) e uma mensagem para o usuário. */
    return res.status(500).json({ message: err });
  }
};

module.exports = createUser;
