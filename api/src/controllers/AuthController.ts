import Koa from "koa";
import { AuthService } from "../services/AuthService";

class AuthController {
  private authService: AuthService;

  constructor(authService: any) {
    this.authService = authService;
  }

  async login(ctx: Koa.Context) {
    const { username = "", password = "" } = ctx.request.body;

    if (username.trim() === "" || password.trim() === "") {
      ctx.status = 400;
      ctx.body = { error: "Missing username and/or password" };
      return;
    }

    const { token } = await this.authService.login({ username, password });

    if (token) {
      ctx.body = { token };
    } else {
      ctx.status = 401;
      ctx.body = { error: "Invalid User or Password" };
    }
  }
}

export { AuthController };
