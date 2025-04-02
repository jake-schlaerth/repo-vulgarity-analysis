import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .get("/", () => "Hello Elysia")
  .get("/health", () => ({ status: "ok" }))
  .group("/api", (app) =>
    app.get("/hello", () => ({ message: "Hello from API" }))
  );

app.listen(3000);

console.log("🦊 Server is running at http://localhost:3000");
