FROM node:20.18.0-alpine3.19 AS builder

RUN apk add --no-cache libc6-compat=1.1.0-r4

WORKDIR /app
RUN npm install -g pnpm@9.15.3
COPY package.json .
RUN pnpm install
COPY . .
RUN pnpm build

FROM node:20.18.0-alpine3.19 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME='0.0.0.0'

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 8080

ENV PORT=8080

RUN apk add --no-cache curl=8.11.1-r0
HEALTHCHECK --interval=30s --timeout=3s \
    CMD ["curl", "-f", "http://localhost:3000", "||", "exit", "1"]

USER nextjs

ENTRYPOINT ["node", "server.js"]

