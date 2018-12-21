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

describe("GET /events/:slug", () => {
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

  describe("When there is no event with the given slug", () => {
    beforeEach(() => {
      td.when(FakeEventService.prototype.findOne("test-event")).thenResolve(
        undefined
      );
    });

    it("should return 404 response", async () => {
      // act
      const response = await request.get("/events/test-event");

      // assert
      response.status.should.equal(404);
    });
  });

  describe("When there is an event with the given slug", () => {
    const eventResponse = {
      slug: "test-event"
    };

    beforeEach(() => {
      td.when(FakeEventService.prototype.findOne("test-event")).thenResolve(
        eventResponse
      );
    });

    it("should return 200 response", async () => {
      // act
      const response = await request.get("/events/test-event");

      // assert
      response.status.should.equal(200);
    });

    it("should return the event", async () => {
      // act
      const response = await request.get("/events/test-event");

      // assert
      response.body.should.deepEqual(eventResponse);
    });
  });
});
