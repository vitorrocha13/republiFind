# 🏠 RepubliFind

Plataforma para cadastro e busca de moradias estudantis.

## Tecnologias

- **Next.js 16** (App Router, Server Actions, TypeScript)
- **PostgreSQL 17** com driver `pg` (SQL puro), via Docker Compose
- **Autenticação**: JWT (`jose`) em cookie httpOnly + hash de senha com `bcrypt`
- **Validação**: Zod nos formulários
- **UI/UX**: CSS Modules + React Hot Toast
- **Mapas**: Leaflet + OpenStreetMap (geocoding via Nominatim)

## Como rodar localmente

### 1. Pré-requisitos

- Node.js 20 ou superior
- Docker Desktop (com a integração WSL ativada, caso você rode no WSL)

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar as variáveis de ambiente

Copie o modelo fornecido (`.env.example`) para `.env.local`:

```bash
cp .env.example .env.local          # WSL / Linux / macOS
Copy-Item .env.example .env.local   # Windows PowerShell
```

Para gerar o `JWT_SECRET`, rode:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Conteúdo do `.env.local`:

```env
JWT_SECRET=sua_chave_gerada_aqui
DATABASE_URL=postgresql://republifind:republifind@localhost:5432/republifind
```

### 4. Subir o banco de dados

```bash
npm run db:up       # sobe o container do Postgres
npm run db:schema   # cria as tabelas (pode rodar quantas vezes quiser)
```

### 5. Iniciar a aplicação

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). O banco começa vazio: crie um usuário em `/cadastro` e depois cadastre as moradias pelo painel.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a build de produção |
| `npm run lint` | Rodar o ESLint |
| `npm run db:up` | Sobe o container do Postgres |
| `npm run db:down` | Para o container (mantém os dados) |
| `npm run db:reset` | Apaga o volume e recria o banco do zero |
| `npm run db:schema` | Aplica o `db/schema.sql` |

## Banco de dados

Tabelas:

- `usuarios` — `id`, `email` (único), `senha_hash`, `criado_em`
- `moradias` — `id`, `usuario_id` (FK → `usuarios`), `nome`, `endereco`, `descricao`, `disponivel`, `criado_em`, `atualizado_em`

## Rotas e permissões

| Rota | Acesso | Descrição |
| --- | --- | --- |
| `/` | público | Landing com "SOBRE" e a seção `#moradias-disponiveis` |
| `/login`, `/cadastro` | público | Autenticação (redirecionam para o painel se já estiver logado) |
| `/dashboard` | privado | Mostra apenas as moradias do usuário logado |
| `/dashboard/cadastrarMoradia` | privado | Cadastro de moradia |
| `/dashboard/editarMoradia/[id]` | privado | Edição da própria moradia |

A lista pública exibe somente moradias com `disponivel = true` e mostra o e-mail do proprietário.

## Estrutura do projeto

```text
app/
  (auth)/            # login, cadastro e dashboard
  componentes/       # header, footer, cards, formulários, mapa
  libs/              # db, sessão, credenciais, queries e geocoding
  page.tsx           # landing page
db/
  schema.sql         # definição das tabelas
  migrate.mjs        # aplica o schema
```

## Autor

Vitor Rocha Mininel


## 📸 Screenshots

### Landing page
![Landing page](public/landing.png)

### Cadastro
![Cadastro de moradia](public/cadastro.png)

### Dashboard
![Dashboard](public/dashboard.png)
