# Social Network - Api

API 'Social Network' permite que desenvolvedores integrem recursos de uma rede social em seus aplicativos. Ela inclui funcionalidades como autenticação de usuários, publicação de postagens e gerenciamento de amigos. A API também pode fornecer informações de perfil de usuário, como nome e sobrenome. É possível acessar esses recursos usando requisições HTTP e receber respostas em formato JSON.

#### 🚧 API em contrução 🚧

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

## Endpoints

<details>
 <summary>Usuários</summary>

#### **observação.: em todos os endpoints será necessário enviar um header de Authorization com um token válido, exceto nos endpoints de login e cadastro de usuário.**

#### **O token será gerado à partir do login de usuário**

#### **Login de usuário**

```
 `POST /api/user/signIn`
```

Os seguintes parâmetros devem ser passados no corpo da requisição:

| Parâmetros | Corpo          | Tipo        |
| ---------- | -------------- | ----------- |
| email      | user@email.com | obrigatório |
| password   | ******\******* | obrigatório |

Se o login for bem sucedido, a resposta será um status code 200 e um JSON com a seguinte estrutura:

```
{
	"message": "User successfully logged in!",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6MSwibmFtZSI6I[...]",
	"user": [
		1,
		"user name",
		"user@email.com"
	]
}
```

#### **Cadastro de usuário**

```
  `POST /api/user`
```

Os seguintes parâmetros devem ser passados no corpo da requisição:

| Parâmetros | Corpo          | Tipo        |
| ---------- | -------------- | ----------- |
| name       | user name      | obrigatório |
| lastName   | user lastname  | obrigatório |
| email      | user@email.com | obrigatório |
| password   | ****\*\*\***** | obrigatório |
| image      | file           | opcional    |

Se o login for bem sucedido, a resposta será um status code 201 e um JSON com a seguinte estrutura:

```json
{
  "message": "User created!"
}
```

#### **Busca por usuário**

```
  `GET /api/user/search/:name`
```

Os seguintes parâmetros devem ser passados no parâmetro da requisição:

| Parâmetros | Parâmetro  | Tipo        |
| ---------- | ---------- | ----------- |
| name       | **string** | obrigatório |

Se houver um usuário cadastrado com nome enviado, via parâmetro, a resposta será um status code 200 e um JSON com a seguinte estrutura:

```json
{
[
	{
		"id": 1,
		"name": "user",
		"lastName": "last name",
		"imagePath": null
	},
	{
		"id": 2,
		"name": "user",
		"lastName": "last name",
		"imagePath": null
	}
]
}
```

#### **Busca de usuário por id**

```
  `GET /api/user/search/:id`
```

Os seguintes parâmetros devem ser passados no parâmetro da requisição:

| Parâmetros | Parâmetro  | Tipo        |
| ---------- | ---------- | ----------- |
| id         | **string** | obrigatório |

Se houver um usuário cadastrado com id enviado, via parâmetro, a resposta será um status code 200 e um JSON com a seguinte estrutura:

```json
{
  "id": 1,
  "name": "user",
  "lastName": "last name",
  "imagePath": null
}
```

#### **Deletar usuário**

```
  `DELETE /api/user/:id`
```

Os seguintes parâmetros devem ser passados no parâmetro da requisição:

| Parâmetros | Parâmetro  | Tipo        |
| ---------- | ---------- | ----------- |
| id         | **string** | obrigatório |

Se houver um usuário cadastrado com id enviado, via parâmetro, a resposta será um status code 200 e um JSON com a seguinte estrutura:

```json
{
  "message": "Successfully deleted user!"
}
```

#### **Email de recuperação de senha**

```
  `POST /api/user/forgout-password`
```

Os seguintes parâmetros devem ser passados no corpo da requisição:

| Parâmetros | Corpo          | Tipo        |
| ---------- | -------------- | ----------- |
| email      | user@email.com | obrigatório |

Um email será enviado um email, recebido via corpo da requisição, a resposta será um status code 200 e um JSON com a seguinte estrutura:

```json
{
  "message": "Password reset email sent"
}
```

#### **Recuperar senha**

```
  `PATCH /api/user/forgout-password/:token`
```

Os seguintes parâmetros devem ser passados no parâmetro da requisição:

| Parâmetros | Parâmetro  | Tipo        |
| ---------- | ---------- | ----------- |
| token      | **string** | obrigatório |

Os seguintes parâmetros devem ser passados no corpo da requisição:

| Parâmetros  | corpo      | Tipo        |
| ----------- | ---------- | ----------- |
| newPassword | **string** | obrigatório |

Se a senha for alterada, a resposta será um status code 200 e um JSON com a seguinte estrutura:

```json
{
  "message": "Password updated successfully"
}
```

</details>

## Licença

[MIT](https://choosealicense.com/licenses/mit/)

## Autores

- [@alexsandro-ms](https://www.github.com/alexsandro-ms)
