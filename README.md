# CRUD de Clientes

Aplicacao full stack inspirada no projeto de usuarios fornecido como referencia. O frontend foi feito com Angular standalone e o backend usa Node.js, Express, TypeScript e PostgreSQL/Supabase.

## Funcionalidades

- listar clientes;
- buscar clientes por nome;
- filtrar clientes por status;
- cadastrar um cliente;
- editar um cliente;
- excluir um cliente com confirmacao;
- exibir mensagens de carregamento, sucesso e erro.

## Estrutura

```text
backend/   API REST e acesso ao PostgreSQL
frontend/  aplicacao Angular
```

## 1. Preparar o banco

Crie um projeto no Supabase, abra o SQL Editor e execute o arquivo `backend/sql/schema.sql`.

## 2. Configurar e iniciar o backend

No PowerShell:

```powershell
cd backend
Copy-Item .env.example .env
npm install
npm run dev
```

Edite o `.env` e substitua `DATABASE_URL` pela connection string do seu PostgreSQL/Supabase. A API ficara disponivel em `http://localhost:3000/api/clients`.

## 3. Iniciar o frontend

Em outro terminal:

```powershell
cd frontend
npm install
npm start
```

Abra `http://localhost:4200`.

## Endpoints

| Metodo | Rota | Acao |
| --- | --- | --- |
| GET | `/api/clients` | Lista e filtra clientes |
| GET | `/api/clients/:id` | Busca um cliente |
| POST | `/api/clients` | Cadastra um cliente |
| PUT | `/api/clients/:id` | Atualiza todos os dados |
| PATCH | `/api/clients/:id` | Atualiza alguns dados |
| DELETE | `/api/clients/:id` | Exclui um cliente |

Filtros opcionais da listagem: `name`, `city` e `status`. Exemplo: `/api/clients?name=ana&status=true`.

