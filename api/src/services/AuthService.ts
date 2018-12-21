import UserLogin from "../models/login/UserLogin";
import LoginResult from "../models/login/LoginResult";
import JWT from "../models/login/JWT";
import jsonwebtoken from "jsonwebtoken";

type Credentials = {
  email: string;
  password: string;
};

const jwtOptions = {
  expiresIn: "1 day"
};

class AuthService {
  private credentials: Credentials;
  private jwtSecret: string;

  constructor(credentials: Credentials, jwtSecret: string) {
    this.credentials = credentials;
    this.jwtSecret = jwtSecret;
  }

  async login(userLogin: UserLogin): Promise<LoginResult> {
    const { email, password } = this.credentials;

    if (userLogin.email === email && userLogin.password === password) {
      let payload: JWT = {
        sub: 1,
        name: "admin",
        iat: new Date().getTime()
      };

      let token = jsonwebtoken.sign(payload, this.jwtSecret, jwtOptions);
      return { token };
    } else {
      return {};
    }
  }
}

export { AuthService };
