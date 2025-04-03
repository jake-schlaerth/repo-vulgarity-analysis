FROM node:22-slim

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.7.1 --activate

COPY backend/package.json ./
RUN pnpm install --no-frozen-lockfile

COPY backend/ .

EXPOSE 3000

CMD ["node", "--loader", "tsx", "src/index.ts"] 