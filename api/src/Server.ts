import Koa from "koa";
import KoaRouter from "koa-router";
import bodyParser from "koa-bodyparser";

function createServer(router: KoaRouter) {
  const app = new Koa();
  const cors = require("@koa/cors");

  app.use(cors());
  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}

export { createServer };
