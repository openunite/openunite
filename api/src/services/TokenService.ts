import jsonwebtoken from "jsonwebtoken";

const defaultJwtOptions = {
  expiresIn: "1 day"
};

class TokenService {
  private jwtSecret: string;

  constructor(jwtSecret: string) {
    this.jwtSecret = jwtSecret;
  }

  async create(payload: Object = {}): Promise<string> {
    const options: jsonwebtoken.SignOptions = defaultJwtOptions;

    return jsonwebtoken.sign(payload, this.jwtSecret, options);
  }

  async verify(token: string) {
    return jsonwebtoken.verify(token, this.jwtSecret);
  }
}

export { TokenService };
