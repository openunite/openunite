import "should";
import KoaRouter from "koa-router";
import { createRouter } from "../src/Router";

describe("Router", () => {
  describe("createRouter", () => {
    it("should return an instance of Koa router", (done) => {
      // arrange
      const router = createRouter();

      // assert
      router.should.be.instanceOf(KoaRouter);

      done();
    });
  });
});
