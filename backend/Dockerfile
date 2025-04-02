FROM oven/bun:1

WORKDIR /app

COPY backend/package.json bun.lock ./
RUN bun install

COPY backend/ .

EXPOSE 3000

CMD ["bun", "run", "dev"] 