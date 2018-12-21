import Koa from "koa";
import { AuthService } from "../services/AuthService";

class AuthController {
  private authService: AuthService;

  constructor(authService: any) {
    this.authService = authService;
  }

  async login(ctx: Koa.Context) {
    const { email = "", password = "" } = ctx.request.body;

    if (email.trim() === "" || password.trim() === "") {
      ctx.status = 400;
      ctx.body = { error: "Missing email and/or password" };
      return;
    }

    const { token } = await this.authService.login({ email, password });

    if (token) {
      ctx.body = { token };
    } else {
      ctx.status = 401;
      ctx.body = { error: "Invalid Email or Password" };
    }
  }
}

export { AuthController };
