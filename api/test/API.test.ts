import "should";
import supertest from "supertest";
import { createServer } from "../src/Server";
import { createRouter } from "../src/Router";
import { AuthController } from "../src/controllers/AuthController";
import { AuthService } from "../src/services/AuthService";

const testHttpPort = 7979;

describe("API", () => {
  const testCredentials = {
    username: "test-user",
    password: "test-password"
  };
  const testJwtSecret = "test-secret";

  let request: supertest.SuperTest<supertest.Test>;
  let server: import("http").Server;

  beforeEach(async () => {
    const authService = new AuthService(testCredentials, testJwtSecret);
    const authController = new AuthController(authService);
    const router = createRouter(authController);
    const app = createServer(router);
    server = app.listen(testHttpPort);
    request = supertest(server);
  });

  afterEach(() => {
    server.close();
  });

  describe("/health", () => {
    it("should return 200 response", async () => {
      // act
      const response = await request.get("/health");

      // assert
      response.status.should.equal(200);
    });
  });

  describe("/login", () => {
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
        const username = "invalid-username";
        const password = "invalid-password";

        // act
        const response = await request
          .post("/login")
          .send({ username, password });

        // assert
        response.status.should.equal(401);
        response.body.should.have.property("error").which.is.a.String();
      });
    });

    describe("When credentials are valid", () => {
      it("should return 200 response", async () => {
        // arrange
        const username = testCredentials.username;
        const password = testCredentials.password;

        // act
        const response = await request
          .post("/login")
          .send({ username, password });

        // assert
        response.status.should.equal(200);
        response.body.should.have.property("token").which.is.a.String();
      });
    });
  });
});
