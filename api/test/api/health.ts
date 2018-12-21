import "should";
import supertest from "supertest";
import { Server } from "http";
import { testHttpPort, createTestServer } from "@openunite/test";

describe("/health", () => {
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;

  beforeEach(() => {
    const app = createTestServer();
    server = app.listen(testHttpPort);
    request = supertest(server);
  });

  afterEach(() => {
    server.close();
  });

  it("should return 200 response", async () => {
    // act
    const response = await request.get("/health");

    // assert
    response.status.should.equal(200);
  });
});
