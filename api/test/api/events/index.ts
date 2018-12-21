import "should";
import td from "testdouble";
import supertest from "supertest";
import { Server } from "http";
import {
  testHttpPort,
  createTestServer,
  createTestRouter,
  createTestEventController
} from "@openunite/test";
import { EventService } from "@openunite/src/services/EventService";

describe("GET /events", () => {
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;
  let FakeEventService: td.TestDoubleConstructor<EventService>;

  beforeEach(() => {
    FakeEventService = td.constructor(EventService);
    const eventController = createTestEventController(new FakeEventService());
    const router = createTestRouter({ eventController });
    const app = createTestServer(router);
    server = app.listen(testHttpPort);
    request = supertest(server);
  });

  afterEach(() => {
    server.close();
  });

  describe("When there are no events", () => {
    beforeEach(() => {
      td.when(FakeEventService.prototype.findAll()).thenResolve([]);
    });

    it("should return 200 response", async () => {
      // act
      const response = await request.get("/events");

      // assert
      response.status.should.equal(200);
    });

    it("should return an empty array", async () => {
      // act
      const response = await request.get("/events");

      // assert
      response.body.should.be.an.Array().which.is.empty();
    });
  });

  describe("When there are events", () => {
    const eventsResponse = [
      {
        test: "event"
      }
    ];

    beforeEach(() => {
      td.when(FakeEventService.prototype.findAll()).thenResolve(eventsResponse);
    });

    it("should return 200 response", async () => {
      // act
      const response = await request.get("/events");

      // assert
      response.status.should.equal(200);
    });

    it("should return the events", async () => {
      // act
      const response = await request.get("/events");

      // assert
      response.body.should.match(eventsResponse);
    });
  });
});

describe("POST /events", () => {
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;
  let FakeEventService: td.TestDoubleConstructor<EventService>;

  beforeEach(() => {
    FakeEventService = td.constructor(EventService);
    const eventController = createTestEventController(new FakeEventService());
    const router = createTestRouter({ eventController });
    const app = createTestServer(router);
    server = app.listen(testHttpPort);
    request = supertest(server);
  });

  afterEach(() => {
    server.close();
  });

  describe("When the request has an invalid token", () => {
    it("should return a 401 response", async () => {
      // act
      const response = await request.post("/events");

      // assert
      response.status.should.equal(401);
    });
  });
});
