import KoaRouter from "koa-router";
import { createServer } from "@openunite/src/Server";
import { createRouter } from "@openunite/src/Router";
import { AuthController } from "@openunite/src/controllers/AuthController";
import { AuthService } from "@openunite/src/services/AuthService";
import { EventController } from "@openunite/src/controllers/EventController";
import { EventService } from "@openunite/src/services/EventService";
import { TokenService } from "@openunite/src/services/TokenService";
import { UserRepository } from "@openunite/src/repositories/UserRepository";
import { User } from "@openunite/src/models/User";

type TestControllers = {
  authController?: AuthController;
  eventController?: EventController;
};

const testHttpPort = 7979;

const testTokenService = new TokenService("test-secret");

const mockedUserRepository: UserRepository = new class MockRepository extends UserRepository {
  private repo = new Map<string, User>();

  async save(user: User): Promise<User> {
    this.repo.set(user.email, user);
    return user;
  }

  async get(k: string): Promise<User | undefined> {
    return this.repo.get(k);
  }

  async delete(k: string): Promise<boolean> {
    return this.repo.delete(k);
  }
  async findOne(): Promise<User | undefined> {
    throw new Error("Not Implemented");
  }
  async findAll(): Promise<Array<User>> {
    throw new Error("Not Implemented");
  }
}();

const testAuthService = new AuthService(
  {
    email: "test@localhost",
    password: "test-password"
  },
  testTokenService,
  mockedUserRepository
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
  createTestEventController,
  mockedUserRepository
};
