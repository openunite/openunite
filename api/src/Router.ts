import KoaRouter from "koa-router";
import { AuthController } from "./controllers/AuthController";

function createRouter(authController: AuthController) {
  const router = new KoaRouter();

  // Auth Routes
  router.post("/login", authController.login.bind(authController));

  // Health endpoint
  router.get("/health", (ctx) => {
    ctx.status = 200;
  });

  return router;
}

export { createRouter };
