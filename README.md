# NotesApp

Aplicação web para criação e gerenciamento de notas pessoais, com autenticação via JWT.

## Stack

Projeto no modelo **MERN**, com Next.js no lugar do React puro:

- **MongoDB** — banco de dados
- **Express** — API REST
- **React (via Next.js)** — interface
- **Node.js** — runtime do backend

**Autenticação:** JWT (JSON Web Token), armazenado no `localStorage` do navegador.

## Estrutura do repositório

```
notesapp/
├── backend/          # API REST (Express + Mongoose + MongoDB)
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server/
│   ├── .env.example
│   └── package.json
└── frontend/          # Interface (Next.js)
    └── notesapp/
        ├── src/
        └── package.json
```

## Funcionalidades

- Cadastro e login de usuários
- Autenticação via JWT
- Criação, edição, listagem e exclusão de notas
- Rotas protegidas (apenas usuários autenticados acessam suas notas)

## Como rodar o projeto

### Pré-requisitos

- Node.js instalado
- Uma instância do MongoDB (local ou Atlas)

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd notesapp
```

### 2. Backend

```bash
cd backend
npm install
```

Cria o arquivo `.env` a partir do exemplo:

```bash
copy .env.example .env
```

Preenche as variáveis no `.env`:

```env
PORT=3000
MONGO_URI=sua_string_de_conexao_do_mongodb
JWT_SECRET=sua_chave_secreta
```

Inicia o servidor:

```bash
npm run dev
```

### 3. Frontend

```bash
cd frontend/notesapp
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:3000` (ou na porta configurada pelo Next.js).

## Autenticação

O login gera um token JWT, retornado pela API e salvo no `localStorage` do navegador. Esse token é enviado nas requisições subsequentes (via header `Authorization`) para acessar rotas protegidas.

> **Observação:** armazenar o JWT no `localStorage` é prático, mas fica exposto a ataques XSS. Para produção, considerar `httpOnly cookies` como alternativa mais segura.

## Licença

Este projeto é de uso pessoal/educacional.