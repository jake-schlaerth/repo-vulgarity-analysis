FROM node:22

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.7.1 --activate

COPY . .

RUN pnpm install

WORKDIR /app/apps/frontend

EXPOSE 5173

CMD ["pnpm", "dev", "--host"] 