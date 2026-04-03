import Fastify from "fastify";

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST ?? "0.0.0.0";

const app = Fastify({
  logger: true,
});

const start = async () => {
  try {
    await app.register(
      async (instance) => {
        instance.get("/", async () => ({ ok: true, service: "@work-hub/back" }));
        instance.get("/health", async () => ({ status: "ok" }));
      },
      { prefix: "/api" },
    );
    await app.listen({ port, host });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

void start();
