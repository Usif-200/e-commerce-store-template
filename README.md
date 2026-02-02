# e-commerce store template

Minimal, production-ready e-commerce reference application.

## Summary

A simple online store backend + frontend scaffold for product catalog, cart, checkout, and order management. Ready for local development, testing, and containerized deployment.

## Features

- Product catalog (CRUD)
- Shopping cart and checkout flow
- User authentication (JWT)
- Order history and admin order management
- REST API + frontend 
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
git clone <repo-url>
cd e-commerce-store-template

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

4. Run migrations and seed 

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

