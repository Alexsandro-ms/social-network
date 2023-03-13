# Social Network - Api

API 'Social Network' permite que desenvolvedores integrem recursos de uma rede social em seus aplicativos. Ela inclui funcionalidades como autenticação de usuários, publicação de postagens e gerenciamento de amigos. A API também pode fornecer informações de perfil de usuário, como nome e sobrenome. É possível acessar esses recursos usando requisições HTTP e receber respostas em formato JSON.

#### 🚧 API em contrução 🚧

## Stack utilizada

**Back-end:** Node, Express, Sequelize, Dotenv, Bcrypt, cors, JsonWebToken, Nodemailer e multer.
**Database:** Mysql.
**Outros:** MailTrap.

## Funcionalidades

- Usuários:
  - Login de usuário.
  - Criação de usuário.
  - Busca de usuário por nome.
  - Busca de usuário por Id.
  - Upload de imagem de perfil de usuário.
  - Email de recuperação de senha.
  - Alterar senha.
  - Deletar usuário.
  - Seguir usuário.
  - Deixar de seguir usuário.
- Postagens:
  - For you.
  - Criar postagem.
  - Listagem de postagens de um usuário.
  - Detalhes de uma postagem.
  - Deletar uma postagem.
  - Curtir postagem.
  - Deixar de curtir postagem.

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

## Criação de uma conta no MAILTRAP

Para usar a funcionalidade de envio de email, deverá criar uma conta na plataforma [MailTrap](https://mailtrap.io), que simula envios de email.

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`JWTKEY`

`MAILTRAPUSER` `MAILTRAPPASSWORD`

`MYSQLUSER` `MYSQLPASSWORD` `MYSQLDATABASE`

## Api

#### **observação.: em todos os endpoints será necessário enviar um header de Authorization com um token válido, exceto nos endpoints de login e cadastro de usuário.**

#### **O token será gerado à partir do login de usuário**

#### **Endpoints**

<details>
 <summary>Usuários</summary>

#### **Login de usuário**

```
 `POST /api/user/signIn`
```

Os seguintes parâmetros devem ser passados no corpo da requisição:

| Parâmetros | Corpo          | Tipo        |
| ---------- | -------------- | ----------- |
| email      | user@email.com | obrigatório |
| password   | **string**     | obrigatório |

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
| password   | **string**     | obrigatório |
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
| id         | **number** | obrigatório |

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

<details>
	
<summary>Seguir</summary>

#### **Seguir usuário**

```
  `POST /api/follow`
```

Os seguintes parâmetros devem ser passados no corpo da requisição:

| Parâmetros | corpo | Tipo        |
| ---------- | ----- | ----------- |
| followerId | id    | obrigatório |

Se um usuário seguir outro, a resposta será um status code 200 e um JSON com a seguinte estrutura:

```json
{
  "message": "Successfully followed user."
}
```

#### **Deixar de seguir usuário**

```
  `DELETE /api/follow`
```

Os seguintes parâmetros devem ser passados no corpo da requisição:

| Parâmetros | corpo | Tipo        |
| ---------- | ----- | ----------- |
| followerId | id    | obrigatório |

Se um usuário deixar de seguir outro, a resposta será um status code 200 e um JSON com a seguinte estrutura:

```json
{
  "message": "Successfully unfollowed."
}
```

</details>

<details>
<summary>Postagens</summary>

#### **Criar postagem**

```
  `POST /api/posts`
```

Os seguintes parâmetros devem ser passados no corpo da requisição:

| Parâmetros | corpo    | Tipo        |
| ---------- | -------- | ----------- |
| body       | conteúdo | obrigatório |
| image      | file     | opcional    |

A resposta será um status code 201 e um JSON com a seguinte estrutura:

```json
{
	{
	"message": "Post created!"
	}
}

```

#### **For you**

```
  `GET /api/posts/:page/:limit`
```

Os seguintes parâmetros devem ser passados no parâmetro da requisição:

| Parâmetros | Parâmetro  | Tipo        |
| ---------- | ---------- | ----------- |
| page       | **number** | obrigatório |
| limit      | **number** | opcional    |

A resposta será um status code 200 e um JSON com a seguinte estrutura:

```json
{
[
	{
		"id": 1,
		"userName": "user",
		"body": "Lorem ipsum dolor sit",
		"imagePath": null,
		"likes": 0,
		"createdAt": "2023-03-13T18:57:57.000Z",
		"updatedAt": "2023-03-13T18:57:57.000Z",
		"userId": 1
	},
	{
		"id": 2,
		"userName": "user",
		"body": "Lorem ipsum dolor sit",
		"imagePath": null,
		"likes": 0,
		"createdAt": "2023-03-13T18:57:57.000Z",
		"updatedAt": "2023-03-13T18:57:57.000Z",
		"userId": 2
	}
]
}

```

#### **Exibir detalhes de uma postagem**

```
  `GET /api/posts/:id`
```

Os seguintes parâmetros devem ser passados no parâmetro da requisição:

| Parâmetros | parâmetro  | Tipo        |
| ---------- | ---------- | ----------- |
| id         | **number** | obrigatório |

A resposta será um status code 200 e um JSON com a seguinte estrutura:

```json
{
  "id": 1,
  "userName": "user",
  "body": "Lorem ipsum dolor sit",
  "imagePath": null,
  "likes": 0,
  "createdAt": "2023-03-13T18:57:57.000Z",
  "updatedAt": "2023-03-13T18:57:57.000Z",
  "userId": 1
}
```

#### **Exibir todas as postagens de um usuário**

```
  `GET /api/posts/:id`
```

Os seguintes parâmetros devem ser passados no parâmetro da requisição:

| Parâmetros | parâmetro  | Tipo        |
| ---------- | ---------- | ----------- |
| id         | **number** | obrigatório |

A resposta será um status code 200 e um JSON com a seguinte estrutura:

```json
{
[
	{
		"id": 1,
		"userName": "user",
		"body": "Lorem ipsum dolor sit",
		"imagePath": null,
		"likes": 0,
		"createdAt": "2023-03-13T18:57:57.000Z",
		"updatedAt": "2023-03-13T18:57:57.000Z",
		"userId": 1
	},
	{
		"id": 2,
		"userName": "user",
		"body": "Lorem ipsum dolor sit",
		"imagePath": null,
		"likes": 0,
		"createdAt": "2023-03-13T18:57:57.000Z",
		"updatedAt": "2023-03-13T18:57:57.000Z",
		"userId": 1
	}
]
}
```

#### **Deletar postagem**

```
  `DELETE /api/posts/:postId`
```

Os seguintes parâmetros devem ser passados no parâmetro da requisição:

| Parâmetros | parâmetro  | Tipo        |
| ---------- | ---------- | ----------- |
| postId     | **number** | obrigatório |

A resposta será um status code 200 e um JSON com a seguinte estrutura:

```json
{
  "message": "Post deleted successfully."
}
```

</details>

<details>

<summary>Curtir</summary>

#### **Curtir postagem**

```
  `POST /api/like`
```

Os seguintes parâmetros devem ser passados no corpo da requisição:

| Parâmetros | corpo      | Tipo        |
| ---------- | ---------- | ----------- |
| postId     | **number** | obrigatório |

A resposta será um status code 200 e um JSON com a seguinte estrutura:

```json
{
  "likes": 0
}
```

</details>

## Licença

[MIT](https://choosealicense.com/licenses/mit/)

## Autores

- [@alexsandro-ms](https://www.github.com/alexsandro-ms)
