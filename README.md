# 🗞️ Expense Tracker 💰

## 📔 Description

Expense Tracker is a team project made during the 4th year of CS studies at the University of Gdańsk. It is a web
application with a purpose of analyzing receipts and expenses for different day-to-day needs like:

- bill tracking and analyzing weekly / monthly / yearly expenses
- analyzing spending habits
- household expense control and budget management

## ⭐ Main features

- create a receipt entry with data like category and date
- extract total cost from the receipt using AI
- display a list of all user receipts
- provide statistics for the user

### Used components

- [https://nextjs.org/](https://nextjs.org/) as a core full-stack framework
- [https://ollama.com/](https://ollama.com/) to set up and run a proper ***large language model*** locally
- [https://pillow.readthedocs.io/en/stable/](https://pillow.readthedocs.io/en/stable/) for ***image processing*** and [https://pypi.org/project/pytesseract/](https://pypi.org/project/pytesseract/) as an ***image to text*** tool
- [https://www.keycloak.org/](https://www.keycloak.org/) for user ***authorization and authentication***
- [https://min.io/](https://min.io/) for storing receipt ***images***
- [https://tailwindcss.com/](https://tailwindcss.com/) and [https://daisyui.com/](https://daisyui.com/) for ***styling*** purposes
-  `MongoDB` as an expenses information ***storage*** and `PostgreSQL` for ***storing*** keycloak user data

## 💻 Running the app locally

There are two possibilities of running the app:

- running both the app and functionality providers inside containers
- running the app in development mode using `pnpm run dev` and functionality providers inside containers with Docker

For both options see guide below 💡

### Running locally with Docker and Docker Compose

The easiest way to run the app locally is to use Docker and Docker Compose. After installing them, it can be started
with one command:

```shell
docker compose -f <filename> up
```

where filename depends on desired environment (docker-compose.dev.yml or docker-compose.prod.yml).

⚠️ Before running the app, it is mandatory to provide environment variables in separate files (.env.dev or .env.prod)
according to the provided example.
