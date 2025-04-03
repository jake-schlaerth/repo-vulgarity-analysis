FROM node:22-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl
RUN corepack enable && corepack prepare pnpm@10.7.1 --activate

COPY backend/ ./
RUN pnpm install
RUN pnpm prisma generate

EXPOSE 3000

CMD ["pnpm", "run", "start:dev"] 