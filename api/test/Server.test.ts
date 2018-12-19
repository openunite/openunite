import "should";
import Koa from "koa";
import { createServer } from "../src/Server";

describe("Server", () => {
  describe("createServer", () => {
    it("should return an instance of Koa server", (done) => {
      // arrange
      const server = createServer();

      // assert
      server.should.be.instanceOf(Koa);

      done();
    });
  });
});
