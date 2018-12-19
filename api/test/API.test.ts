import supertest from "supertest";
import { createServer } from "../src/Server";
import { createRouter } from "../src/Router";

describe("API", () => {
  let request: supertest.SuperTest<supertest.Test>;
  let server: import("http").Server;

  beforeEach(async () => {
    const router = createRouter();
    const app = createServer(router);
    server = app.listen(7979);
    request = supertest(server);
  });

  afterEach(() => {
    server.close();
  });

  describe("/health", () => {
    it("should return 200 response", () => {
      return request.get("/health").expect(200);
    });
  });
});
