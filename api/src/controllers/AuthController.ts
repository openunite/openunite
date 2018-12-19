import Koa from "koa";
import * as AuthService from "../services/AuthService";
export let login = async (ctx: Koa.Context) => {
  let { token } = await AuthService.login({
    username: ctx.request.body.username,
    password: ctx.request.body.password
  });

  if (token) {
    ctx.body = { token };
  } else {
    ctx.status = 401;
    ctx.body = { error: "Invalid User or Password" };
  }
};
