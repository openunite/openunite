import KoaRouter from "koa-router";

import * as AuthController from "./controllers/AuthController"

function createRouter() {
  const router = new KoaRouter();

  // Auth Routes
  router.post("/api/login", AuthController.login)

  // Health endpoint
  router.get("/api/health", (ctx) => {
    ctx.status = 200;
  });

  return router;
}

export { createRouter };
