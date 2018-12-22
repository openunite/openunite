import Koa from "koa";
import { AuthService } from "../services/AuthService";

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
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

  async authorizeMiddleware(ctx: Koa.Context, next: Function) {
    const authorizationHeader = ctx.request.headers.authorization as string;

    if (!authorizationHeader) {
      ctx.status = 401;
      ctx.body = { error: "Unauthorized request" };
      return;
    }

    const { groups = {} } =
      authorizationHeader.match(/^bearer\s+(?<token>.+)$/i) || ({} as any);

    if (!groups.token) {
      ctx.status = 401;
      ctx.body = { error: "Unauthorized request" };
      return;
    }

    // @ts-ignore
    ctx.request.identity = await this.authService.verifyToken(groups.token);

    return next();
  }
}

export { AuthController };
