import "should";
import supertest from "supertest";
import { Server } from "http";
import {
  testHttpPort,
  createTestServer,
  createTestRouter,
  createTestAuthController
} from "@openunite/test";
import { AuthService } from "@openunite/src/services/AuthService";

const testCredentials = {
  email: "test@localhost",
  password: "test-password"
};

const testJwtSecret = "test-secret";

describe("/login", () => {
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;

  beforeEach(() => {
    const authService = new AuthService(testCredentials, testJwtSecret);
    const authController = createTestAuthController(authService);
    const router = createTestRouter({ authController });
    const app = createTestServer(router);
    server = app.listen(testHttpPort);
    request = supertest(server);
  });

  afterEach(() => {
    server.close();
  });

  describe("When credentials are missing", () => {
    it("should return 400 response", async () => {
      // act
      const response = await request.post("/login");

      // assert
      response.status.should.equal(400);
    });
  });

  describe("When credentials are invalid", () => {
    it("should return 401 response", async () => {
      // arrange
      const email = "invalid-email";
      const password = "invalid-password";

      // act
      const response = await request.post("/login").send({ email, password });

      // assert
      response.status.should.equal(401);
      response.body.should.have.property("error").which.is.a.String();
    });
  });

  describe("When credentials are valid", () => {
    // arrange
    const email = testCredentials.email;
    const password = testCredentials.password;

    it("should return 200 response", async () => {
      // act
      const response = await request.post("/login").send({ email, password });

      // assert
      response.status.should.equal(200);
    });

    it("should return a JWT token", async () => {
      // act
      const response = await request.post("/login").send({ email, password });

      // assert
      response.body.should.have.property("token").which.is.a.String();
    });
  });
});
