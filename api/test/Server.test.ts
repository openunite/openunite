import "should";
import Koa from "koa";
import KoaRouter from "koa-router";
import { createServer } from "../src/Server";

describe("Server", () => {
  describe("createServer", () => {
    it("should return an instance of Koa server", (done) => {
      // arrange
      const router = new KoaRouter();

      // act
      const server = createServer(router);

      // assert
      server.should.be.instanceOf(Koa);

      done();
    });
  });

  it("should use the given Router", (done) => {
    // arrange
    const router = new KoaRouter();

    // act
    const server = createServer(router);

    // assert
    const hasRouter = server.middleware.some(
      (middleware: any) => typeof middleware.router !== "undefined"
    );

    hasRouter.should.be.true();

    done();
  });
});
