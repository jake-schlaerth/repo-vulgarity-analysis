FROM node:22-slim

WORKDIR /app

RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@10.7.1 --activate

COPY analyzer/package.json ./
RUN pnpm install --no-frozen-lockfile

COPY analyzer/ .

CMD ["tail", "-f", "/dev/null"] 