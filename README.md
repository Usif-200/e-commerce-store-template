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

- Backend: Node.js, Express (or your preferred framework)
- Database: PostgreSQL (or MySQL/SQLite)
- Auth: JWT
- Frontend: React / Vue (optional)
- Dev tooling: Docker, dotenv, TypeScript (optional)

## Prerequisites

- Git
- Node.js >= 16
- npm or yarn
- PostgreSQL (or Docker)

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

## Docker (optional)

1. Build and run

```bash
docker compose up --build
```

2. Services: app, db

## Tests

- Unit and integration tests with Jest / Mocha

```bash
npm run test
```

## Contributing

- Fork, create feature branch, add tests, open PR.
- Follow repository linting and commit conventions.

## License

Specify license in LICENSE file (e.g., MIT).

## Contact

Open issues or PRs on the repository for questions and fixes.
