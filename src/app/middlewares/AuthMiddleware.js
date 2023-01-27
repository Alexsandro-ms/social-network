const jwt = require("jsonwebtoken");
const JWTKEY = process.env.JWTKEY;
const NOT_AUTHORIZED_MESSAGE = { message: "Not authorized!" };

const AuthMiddleware = (req, res, next) => {
  /* Desestruturando a propriedade de autorização do objeto req.headers. */
  const { authorization } = req.headers;
  /* Retornando um erro de não autorizado, caso não exista um cabeçalho de authorização. */
  if (!authorization) {
    return res.status(401).json(NOT_AUTHORIZED_MESSAGE);
  }
  try {
    /* Atribuindo cabeçalho de autorização à variável chamada token. */
    const token = authorization;
    /* Desestruturando as propriedades de nome e e-mail do payload carregado no token. */
    const { name, email } = jwt.verify(token, JWTKEY);
    /* Atribuindo as variáveis ​​name e email à propriedade loggingUserInfo do objeto req. */
    req.loggedUserInfo = { name, email };
    /* Atribuindo token a propriedade token do objeto req, */
    req.token = token;
    return next();
  } catch (err) {
    /* Retornando status 401 ( Não autorizado. ) e um json contendo uma mensagem ( Not authorized! ) */
    return res.status(401).json(NOT_AUTHORIZED_MESSAGE);
  }
};

module.exports = AuthMiddleware;
