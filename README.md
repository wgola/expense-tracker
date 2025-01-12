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

## Retrieving statistics

For retrieval of statistics, the application leverages the power of `MongoDB` aggregation framework.
The statistics are calculated based on the user's expenses. Some example of these statistics are:

- **Total expenses** - sum of all user expenses in a given period or overall if no period is provided:

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Receipt } from '@/server/database/models/receipt.model';

export const getTotalExpenses = async (dateFrom: Date | null, dateTo: Date | null) => {
  const session = await getServerSession(authOptions); // get user session

  return Receipt.aggregate<{ totalAmount: number }>([
    { $match: { owner: session?.user?.email ?? '' } }, // filter by user
    {
      $match: {
        // filter by date
        date: {
          $gte: dateFrom ?? new Date(0),
          $lte: dateTo ?? new Date()
        }
      }
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: '$totalCost' } // sum all expenses
      }
    },
    {
      $project: {
        _id: 0,
        totalAmount: 1 // return only total amount
      }
    }
  ])
    .exec()
    .then((result) => result[0]?.totalAmount || 0); // return total amount or 0 if no expenses
};
```

- **Expenses by category** - sum of all user expenses grouped by category:

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Receipt } from '@/server/database/models/receipt.model';

export const getTotalExpensesPerCategory = async (dateFrom: Date | null, dateTo: Date | null) => {
  const session = await getServerSession(authOptions); // get user session

  return await Receipt.aggregate<{ category: string; totalAmount: number }>([
    { $match: { owner: session?.user?.email ?? '' } }, // filter by user
    {
      $match: {
        // filter by date
        date: {
          $gte: dateFrom ?? new Date(0),
          $lte: dateTo ?? new Date()
        }
      }
    },
    {
      $group: {
        _id: '$category', // group by category
        totalAmount: { $sum: '$totalCost' } // sum all expenses
      }
    },
    {
      $project: {
        // return only category and total amount
        _id: 0,
        category: '$_id',
        totalAmount: 1
      }
    },
    { $sort: { totalAmount: -1 } } // sort by total amount descending
  ]).exec();
};
```

- **Expenses by date** - sum of all user expenses grouped by date:

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Receipt } from '@/server/database/models/receipt.model';

export const getTotalExpensesPerDate = async (dateFrom: Date | null, dateTo: Date | null) => {
  const session = await getServerSession(authOptions); // get user session

  return await Receipt.aggregate<{ date: string; totalAmount: number }>([
    { $match: { owner: session?.user?.email ?? '' } }, // filter by user
    {
      $match: {
        // filter by date
        date: {
          $gte: dateFrom ?? new Date(0),
          $lte: dateTo ?? new Date()
        }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }, // group by date
        totalAmount: { $sum: '$totalCost' } // sum all expenses
      }
    },
    {
      $project: {
        // return only date and total amount
        _id: 0,
        date: '$_id',
        totalAmount: 1
      }
    },
    { $sort: { date: 1 } } // sort by date ascending
  ]).exec();
};
```

Statistics are calculated on the server side and then displayed for the user in his statistics dashboard.

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
