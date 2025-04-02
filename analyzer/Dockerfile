FROM oven/bun:1

WORKDIR /app

RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

COPY package.json bun.lock ./
RUN bun install

# wtf prisma doesn't work with bun?
COPY --from=node:20 /usr/local/bin/node /usr/local/bin/node

COPY . .

CMD ["tail", "-f", "/dev/null"] 