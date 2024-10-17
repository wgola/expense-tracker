FROM node:20.18.0-alpine3.19 as builder

RUN apk add --no-cache libc6-compat

WORKDIR /app
RUN npm install -g pnpm
COPY package.json .
RUN pnpm install
COPY . .
RUN pnpm build

FROM node:20.18.0-alpine3.19

WORKDIR /app
COPY --from=builder /app ./

RUN apk add curl
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:3000 || exit 1

EXPOSE 3000

CMD ["node", "server.js"]
