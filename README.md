# 🗞️ Expense Tracker 💰

## 📔 Description

Expense Tracker is a web application with a purpose of analyzing receipts and expenses for different day-to-day needs
like:

- bill tracking and analyzing weekly / monthly / yearly expenses
- analyzing spending habits
- household expense control and budget management

## ⭐ Main features

- create a receipt entry with data like category and date
- extract total cost from the receipt using AI ([receipt-analyzer](./receipt-analyzer))
- display a list of all user receipts
- provide statistics for the user

### Used technologies

Whole application consists of 7 services build with different technologies:

- [`Next.js`](https://nextjs.org/) and [`TypeScript`](https://www.typescriptlang.org) - used to build main application
- [`Ollama`](https://ollama.com/) - tool responsible for setting up and running **_large language model (LLM)_** locally
- [`Python`](https://www.python.org/) - programming language used to build **_receipt-analyzer_** service
- [`Keycloak`](https://www.keycloak.org/) - for user **_authorization_** and **_authentication_**
- [`MinIO`](https://min.io/) - as a storage service for receipt images
- [`MongoDB`](https://www.mongodb.com) - as an expenses information database
- [`PostgreSQL`](https://www.postgresql.org.pl) - as a database for `Keycloak`

## 💻 Running the app locally

There are two possibilities of running the app:

- in development environment
- in production mode

### ⚠️ Attention

Before running the app, it is mandatory to provide environment variables in files according to used environment (
`.env.dev` or `.env.prod`)
following the provided example `.env.example`.

### Running for development

To run the application for development, first you need to set up all necessary services.
Easiest way to start all of them is to use `Docker` and `Docker Compose` with this command:

```shell
docker compose -f docker-compose.dev.yml --env-file .env.local up
```

Then, you have to run the app locally using the following command:
The app will be available at `http://localhost:3000`.

```shell
pnpm dev
```

### Running for production

To run the application in production mode, you can use prepared `docker-compose.prod.yaml` file:

```shell
docker compose -f docker-compose.prod.yml --env-file .env.prod up --build
```

The app will be available at `http://localhost:3000`.
