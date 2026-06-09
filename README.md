# CRUD NestJS — POO 2026/1

API REST de CRUD de usuários com **NestJS**, **Prisma ORM** e **PostgreSQL**.

---

## Tecnologias

- [NestJS](https://nestjs.com/) — framework Node.js
- [Prisma](https://www.prisma.io/) — ORM com migrations
- [PostgreSQL](https://www.postgresql.org/) — banco de dados relacional
- [Swagger](https://swagger.io/) — documentação interativa da API
- `class-validator` / `class-transformer` — validação de dados de entrada

---

## Pré-requisitos

- Node.js >= 18
- PostgreSQL rodando localmente

---

## Instalação e execução

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variável de ambiente
# Edite o arquivo .env com suas credenciais do PostgreSQL:
# DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DBdev?schema=public"

# 3. Criar o banco e aplicar a migration
npx prisma migrate dev --name init

# 4. Iniciar o servidor
npm run start:dev
```

---

## Endpoints

| Método | Rota         | Descrição              |
|--------|--------------|------------------------|
| POST   | `/users`     | Criar usuário          |
| GET    | `/users`     | Listar todos           |
| GET    | `/users/:id` | Buscar por ID          |
| PATCH  | `/users/:id` | Atualizar usuário      |
| DELETE | `/users/:id` | Remover usuário        |

---

## Documentação Swagger

Com o servidor rodando, acesse:

```
http://localhost:3000/api
```

---

## Estrutura do projeto

```
src/
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── users/
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── users.controller.ts
│   ├── users.module.ts
│   └── users.service.ts
├── app.module.ts
└── main.ts
prisma/
└── schema.prisma
```

---

## Modelo de dados

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  password  String
  createdAt DateTime @default(now())
  updateAt  DateTime @updatedAt()
}
```

---

## Pontos implementados

- [x] Configuração do projeto NestJS com Prisma
- [x] Modelagem do banco com `schema.prisma` e migration
- [x] `PrismaService` com driver adapter (`@prisma/adapter-pg`)
- [x] CRUD completo (Create, Read, Update, Delete)
- [x] DTOs com validação via `class-validator`
- [x] `ValidationPipe` global no `main.ts`
- [x] Documentação Swagger com `@nestjs/swagger`
- [x] Tratamento de erros do Prisma (409 para email duplicado, 404 para ID inexistente)
