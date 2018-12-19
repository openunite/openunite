import UserLogin from "../models/login/UserLogin";
import LoginResult from "../models/login/LoginResult";
import JWT from "../models/login/JWT";
import jsonwebtoken from "jsonwebtoken";

type Credentials = {
  username: string;
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
    const { username, password } = this.credentials;

    if (userLogin.username === username && userLogin.password === password) {
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
