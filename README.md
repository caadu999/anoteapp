## AnoteApp

Aplicação web para criação e gerenciamento de notas pessoais, com autenticação via JWT.

🔗 **Aplicação online:** [anoteapp-iota.vercel.app](https://anoteapp-iota.vercel.app)

## Stack

- **PostgreSQL** — banco de dados
- **Prisma** — ORM
- **Express** — API REST
- **React (via Next.js)** — interface
- **Node.js** — runtime do backend

**Autenticação:** JWT (JSON Web Token), armazenado em **cookies** (httpOnly).

## Funcionalidades

- Cadastro e login de usuários
- Autenticação via JWT (cookies httpOnly)
- Criação, listagem e exclusão de notas
- Rotas protegidas (apenas usuários autenticados acessam suas notas)

## Como rodar o projeto

### Pré-requisitos

- Node.js instalado
- Uma instância do PostgreSQL (local ou hospedada)

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
PORT=8000
DATABASE_URL=sua_string_de_conexao_do_postgresql
JWT_SECRET=sua_chave_secreta
```

Roda as migrations do Prisma:

```bash
npx prisma migrate dev
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

O login gera um token JWT, retornado pela API e salvo em um **cookie httpOnly**. Esse token é enviado automaticamente pelo navegador nas requisições subsequentes para acessar rotas protegidas.

**Deploy:**

- Frontend hospedado na [Vercel](https://vercel.com)
- Backend hospedado no [Railway](https://railway.app)
- Banco de dados hospedado no [Neon](https://neon.tech)

## Licença

Este projeto é de uso pessoal/educacional.
