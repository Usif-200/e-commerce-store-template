# ecom

Minimal, production-ready e-commerce reference application.

## Summary

A simple online store backend + frontend scaffold for product catalog, cart, checkout, and order management. Ready for local development, testing, and containerized deployment.

## Features

- Product catalog (CRUD)
- Shopping cart and checkout flow
- User authentication (JWT)
- Order history and admin order management
- REST API + optional frontend (React/Vue)
- DB migrations and seed data

## Tech stack

- Backend: Node.js, Express.js
- Auth: JWT
- Frontend: React.js
- Dev tooling: dotenv, TypeScript 

## Prerequisites

- Git
- Node.js >= 16
- npm or yarn


## Quickstart (local)

1. Clone

```bash
git clone <repo-url> ecom
cd ecom
```

2. Install

```bash
npm install
# or
yarn
```

3. Copy env template and edit

```bash
cp .env.example .env
# edit .env to set DB connection and JWT_SECRET
```

4. Run migrations and seed (example using knex/typeorm/sequelize)

```bash
npm run migrate
npm run seed
```

5. Start dev server

```bash
npm run dev
```

## Environment (example .env)

```
PORT=4000
NODE_ENV=development
DATABASE_URL=postgres://user:pass@localhost:5432/ecom
JWT_SECRET=change_this_to_a_secure_value
```

## Common scripts

- npm run dev — start dev server with hot reload
- npm run build — build for production
- npm start — start production server
- npm run test — run tests
- npm run migrate — run DB migrations
- npm run seed — seed demo data
- npm run lint — lint code



