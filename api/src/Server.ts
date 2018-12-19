import Koa from "koa";

function createServer(router: import("koa-router")) {
  const app = new Koa();

  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}

export { createServer };
