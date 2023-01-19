const jwt = require("jsonwebtoken");

const AuthMiddleware = (req, res, next) => {
  /* Obtendo o token do cabeçalho. */
  const token = req.headers.authorization.split(" ")[1];

  if (token != undefined) {
    /* Obtendo o JWTKEY ​​do arquivo .env. */
    const jwtKey = process.env.JWTKEY;

    /* Verificando o token e se for válido, está retornando as informações armazenadas no payload. */
    jwt.verify(token, jwtKey, (err, data) => {
      if (err) {
        return res.status(401).json({ message: "Not autorized!" });
      } else {
        req.token = token;
        req.loggedUserInfo = {
          name: data.name,
          email: data.email
        };
      }
      return next();
    });
  } else {
    return res.status(401).json({ message: "Not authorized!" });
  }
};

module.exports = AuthMiddleware;
