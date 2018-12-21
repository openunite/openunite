import KoaRouter from "koa-router";
import { AuthController } from "./controllers/AuthController";
import { EventController } from "./controllers/EventController";

function createRouter(
  authController: AuthController,
  eventController: EventController
) {
  const router = new KoaRouter();

  // Auth Routes
  router.post("/login", authController.login.bind(authController));

  // Health endpoint
  router.get("/health", (ctx) => {
    ctx.status = 200;
  });

  // Events endpoint
  router.get("/events", eventController.listAll.bind(eventController));

  return router;
}

export { createRouter };
