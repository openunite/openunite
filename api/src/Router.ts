import KoaRouter from "koa-router";

function createRouter() {
  const router = new KoaRouter();

  // Health endpoint
  router.get("/health", (ctx) => {
    ctx.status = 200;
  });

  return router;
}

export { createRouter };
