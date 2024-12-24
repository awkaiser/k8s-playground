// https://hono.dev/docs/

import { Hono } from "npm:hono";

const hostname = Deno.env.get("LISTEN_HOST");
const port = Number(Deno.env.get("LISTEN_PORT"));

const app = new Hono();

app.get("/", async (c) => {
  performance.mark("request");

  async function delayedResponse() {
    await new Promise((resolve) => {
      setTimeout(() => resolve(true), 100);
    });

    performance.mark("response");

    return {
      responseTime: Math.round(
        performance.measure("delay", "request", "response").duration,
      ),
      service: "deno-hono",
    };
  }

  return c.json(await delayedResponse());
});

Deno.serve({ hostname, port }, app.fetch);
