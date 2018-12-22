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
import { AuthController } from "@openunite/src/controllers/AuthController";

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

  describe("When the request has an invalid token", () => {
    beforeEach(() => {
      const router = createTestRouter();
      const app = createTestServer(router);
      server = app.listen(testHttpPort);
      request = supertest(server);
    });

    afterEach(() => {
      server.close();
    });

    it("should return a 401 response", async () => {
      // act
      const response = await request.post("/events");

      // assert
      response.status.should.equal(401);
    });
  });

  describe("When the request is invalid", () => {
    let FakeAuthController: td.TestDoubleConstructor<AuthController>;

    beforeEach(() => {
      FakeAuthController = td.constructor(AuthController);
      td.when(
        FakeAuthController.prototype.authorizeMiddleware(
          td.matchers.anything(),
          td.matchers.anything()
        )
      ).thenDo((_: any, next: Function) => next());
      const authController = new FakeAuthController();
      const router = createTestRouter({ authController });
      const app = createTestServer(router);
      server = app.listen(testHttpPort);
      request = supertest(server);
    });

    afterEach(() => {
      server.close();
    });

    it("should return a 400 response when body is missing", async () => {
      // act
      const response = await request.post("/events");

      // assert
      response.status.should.equal(400);
      response.body.should.have.property("error").which.is.a.String();
    });

    it("should return a 400 response when title is missing", async () => {
      // act
      const response = await request.post("/events").send({
        date: Date.now(),
        description: "test-description"
      });

      // assert
      response.status.should.equal(400);
      response.body.error.should.match(/title/);
    });

    it("should return a 400 response when title is not a string", async () => {
      // act
      const response = await request.post("/events").send({
        title: 1,
        date: Date.now(),
        description: "test-description"
      });

      // assert
      response.status.should.equal(400);
      response.body.error.should.match(/title/);
    });

    it("should return a 400 response when date is missing", async () => {
      // act
      const response = await request.post("/events").send({
        title: "test-title",
        description: "test-description"
      });

      // assert
      response.status.should.equal(400);
      response.body.error.should.match(/date/);
    });

    it("should return a 400 response when date is not a valid timestamp", async () => {
      // act
      const response = await request.post("/events").send({
        title: "test-title",
        date: 123,
        description: "test-description"
      });

      // assert
      response.status.should.equal(400);
      response.body.error.should.match(/date/);
    });

    it("should return a 400 response when description is missing", async () => {
      // act
      const response = await request.post("/events").send({
        title: "test-title",
        date: Date.now()
      });

      // assert
      response.status.should.equal(400);
      response.body.error.should.match(/description/);
    });

    it("should return a 400 response when description is not a string", async () => {
      // act
      const response = await request.post("/events").send({
        title: "test-title",
        date: Date.now(),
        description: true
      });

      // assert
      response.status.should.equal(400);
      response.body.error.should.match(/description/);
    });

    it("should return a 400 response when slug is invalid", async () => {
      // act
      const response = await request.post("/events").send({
        slug: "not a slug!",
        title: "test-title",
        date: Date.now(),
        description: true
      });

      // assert
      response.status.should.equal(400);
      response.body.error.should.match(/slug/);
    });
  });

  describe("When the request is valid", () => {
    let FakeAuthController: td.TestDoubleConstructor<AuthController>;

    beforeEach(() => {
      FakeAuthController = td.constructor(AuthController);
      td.when(
        FakeAuthController.prototype.authorizeMiddleware(
          td.matchers.anything(),
          td.matchers.anything()
        )
      ).thenDo((_: any, next: Function) => next());
      const authController = new FakeAuthController();
      const router = createTestRouter({ authController });
      const app = createTestServer(router);
      server = app.listen(testHttpPort);
      request = supertest(server);
    });

    afterEach(() => {
      server.close();
    });

    it("should return a 201 response", async () => {
      // act
      const response = await request.post("/events").send({
        title: "test-title",
        date: Date.now(),
        description: "test-description"
      });

      // assert
      response.status.should.equal(201);
    });

    it("should return the event slug", async () => {
      // act
      const response = await request.post("/events").send({
        slug: "test-title",
        title: "Test Title",
        date: Date.now(),
        description: "test-description"
      });

      // assert
      response.body.slug.should.equal("test-title");
    });

    it("should slugify the title if a slug is not given", async () => {
      // act
      const response = await request.post("/events").send({
        title: "Test Title Without Slug",
        date: Date.now(),
        description: "test-description"
      });

      // assert
      response.body.slug.should.equal("test-title-without-slug");
    });

    xit("should save the event in the database", async () => {});
  });
});
