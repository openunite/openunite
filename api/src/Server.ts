import Koa from "koa";
import bodyParser from "koa-bodyparser";

function createServer(router: import("koa-router")) {
  const app = new Koa();

  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}

export { createServer };
