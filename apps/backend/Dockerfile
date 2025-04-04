FROM node:22

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.7.1 --activate

COPY . .

RUN pnpm install --no-frozen-lockfile

WORKDIR /app/packages/database
RUN pnpm prisma generate

EXPOSE 3000

WORKDIR /app/apps/backend
CMD ["pnpm", "run", "start:dev"] 