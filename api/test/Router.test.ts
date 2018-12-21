import "should";
import KoaRouter from "koa-router";
import td from "testdouble";
import { createRouter } from "../src/Router";

describe("Router", () => {
  describe("createRouter", () => {
    it("should return an instance of Koa router", (done) => {
      // arrange
      const authController = {
        login: td.function()
      };
      const eventController = {
        listAll: td.function(),
        getDetail: td.function()
      };

      // act
      const router = createRouter(
        authController as any,
        eventController as any
      );

      // assert
      router.should.be.instanceOf(KoaRouter);

      done();
    });
  });
});
