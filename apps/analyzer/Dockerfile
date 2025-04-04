FROM node:22

WORKDIR /app

RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@10.7.1 --activate

COPY . .

RUN pnpm install --no-frozen-lockfile

WORKDIR /app/packages/database
RUN pnpm prisma generate

WORKDIR /app/apps/analyzer
RUN pnpm build

CMD ["tail", "-f", "/dev/null"]