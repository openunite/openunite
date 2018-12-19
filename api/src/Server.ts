import Koa from "koa";

function createServer() {
  const app = new Koa();

  return app;
}

export { createServer };
