import KoaRouter from "koa-router";
import { createServer } from "@openunite/src/Server";
import { createRouter } from "@openunite/src/Router";
import { AuthController } from "@openunite/src/controllers/AuthController";
import { AuthService } from "@openunite/src/services/AuthService";
import { EventController } from "@openunite/src/controllers/EventController";
import { EventService } from "@openunite/src/services/EventService";
import { TokenService } from "@openunite/src/services/TokenService";

type TestControllers = {
  authController?: AuthController;
  eventController?: EventController;
};

const testHttpPort = 7979;

const testTokenService = new TokenService("test-secret");

const testAuthService = new AuthService(
  {
    email: "test@localhost",
    password: "test-password"
  },
  testTokenService
);

const testEventService = new EventService();

function createTestAuthController(service: AuthService = testAuthService) {
  return new AuthController(service);
}

function createTestEventController(service: EventService = testEventService) {
  return new EventController(service);
}

function createTestRouter(controllers: TestControllers = {}) {
  const {
    authController = createTestAuthController(),
    eventController = createTestEventController()
  } = controllers;

  return createRouter(authController, eventController);
}

function createTestServer(router: KoaRouter = createTestRouter()) {
  return createServer(router);
}

export {
  testHttpPort,
  createTestServer,
  createTestRouter,
  createTestAuthController,
  createTestEventController
};
