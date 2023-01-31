# Social Network - Api

API 'Social Network' permite que desenvolvedores integrem recursos de uma rede social em seus aplicativos. Ela inclui funcionalidades como autenticação de usuários, publicação de postagens e gerenciamento de amigos. A API também pode fornecer informações de perfil de usuário, como nome e sobrenome. É possível acessar esses recursos usando requisições HTTP e receber respostas em formato JSON.

## Stack utilizada

**Back-end:** Node, Express, Sequelize, Dotenv, Bcrypt, cors, JsonWebToken e Nodemailer.
**Database:** Mysql.

## Funcionalidades

- Cadastro de usuários;
- Login de usuário;
- Deletar conta de usuário;
- Exibição de um usuário;
- Envio de e-mail para recuperação;
- Alterar senha;
- Seguir usuário;
- Deixar de seguir usuário;
- Criar post;
- Listar todos os posts de um usuário;
- Listar informações de um único post;
- Deletar post.

## Clonando repositório

```bash
  git clone https://github.com/Alexsandro-ms/social-network.git
```

## Instalação

Instale as dependências de social-network com npm ou yarn

```bash
  cd social-network
  npm install ## yarn
```

## Criação de um Schema no mysql

Crie um novo Schema do mysql, necessário para a prosseguir com o funcionamento da aplicação

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`JWTKEY`

`MAILTRAPUSER` `MAILTRAPUSER`

`MYSQLUSER` `MYSQLPASSWORD` `MYSQLDATABASE`

## Licença

[MIT](https://choosealicense.com/licenses/mit/)

## Autores

- [@alexsandro-ms](https://www.github.com/alexsandro-ms)
