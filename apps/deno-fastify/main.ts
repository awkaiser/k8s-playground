// https://fastify.dev/docs/latest/

import Fastify from "npm:fastify";

const host = Deno.env.get("LISTEN_HOST");

const fastify = Fastify({ logger: !host });

fastify.get("/", async (_, reply) => {
  performance.mark("request");

  async function delayedResponse() {
    await new Promise((resolve) => {
      setTimeout(() => resolve(true), 100);
    });

    performance.mark("response");

    return {
      responseTime: Math.round(
        performance.measure("delay", "request", "response").duration
      ),
      service: "deno-fastify",
    };
  }

  return reply.send(await delayedResponse());
});

const start = async () => {
  try {
    await fastify.listen({ host: host ?? "127.0.0.1", port: 3000 });
  } catch (err) {
    fastify.log.error(err);

    Deno.exit(1);
  }
};

start();
