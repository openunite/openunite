import UserLogin from "../models/login/UserLogin";
import LoginResult from "../models/login/LoginResult";
import { TokenService } from "./TokenService";

type Credentials = {
  email: string;
  password: string;
};

class AuthService {
  private credentials: Credentials;
  private tokenService: TokenService;

  constructor(credentials: Credentials, tokenService: TokenService) {
    this.credentials = credentials;
    this.tokenService = tokenService;
  }

  async login(userLogin: UserLogin): Promise<LoginResult> {
    const { email, password } = this.credentials;

    if (userLogin.email === email && userLogin.password === password) {
      const token = await this.tokenService.create("1", { name: email });
      return { token };
    } else {
      return {};
    }
  }

  async verifyToken(token: string) {
    return await this.tokenService.verify(token);
  }
}

export { AuthService };
