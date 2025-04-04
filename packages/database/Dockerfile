FROM node:22-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl
RUN corepack enable && corepack prepare pnpm@10.7.1 --activate

COPY . .

RUN pnpm install --no-frozen-lockfile

WORKDIR /app/packages/database

RUN pnpm build
RUN pnpm prisma generate
