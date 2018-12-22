import UserLogin from "../models/login/UserLogin";
import LoginResult from "../models/login/LoginResult";
import JWTPayload from "../models/login/JWTPayload";
import { TokenService } from "./TokenService";
import { UserRepository } from "../repositories/UserRepository";
import { User, Role } from "../models/User";
import crypto from "crypto";

type Credentials = {
  email: string;
  password: string;
};

const saltLength = 128;
function genRandomString(length: number) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

function saltPassword(password: string, salt: string) {
  var hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  return hash.digest("hex");
}

class AuthService {
  private credentials: Credentials;
  private tokenService: TokenService;

  private userRepository: UserRepository;

  constructor(
    credentials: Credentials,
    tokenService: TokenService,
    userRepository: UserRepository
  ) {
    this.credentials = credentials;
    this.tokenService = tokenService;
    this.userRepository = userRepository;
  }

  async login(userLogin: UserLogin): Promise<LoginResult> {
    const { email, password } = userLogin;
    const existingUser = await this.userRepository.get(email);
    if (!existingUser) {
      return {};
    } else {
      const pwd = saltPassword(password, existingUser.passwordSalt || "");
      if (pwd != existingUser.password) {
        return {};
      } else {
        const jwtPayload: JWTPayload = {
          sub: existingUser.id || 0,
          name: existingUser.profile.name,
          iat: new Date().getTime(),
          role: Role[existingUser.role]
        };
        const token = await this.tokenService.create(jwtPayload);
        return { token };
      }
    }
  }

  async verifyToken(token: string) {
    return await this.tokenService.verify(token);
  }

  async createUser(user: User) {
    let salt = genRandomString(saltLength);
    let passwordHash = saltPassword(user.password, salt);
    user.passwordSalt = salt;
    user.password = passwordHash;
    this.userRepository.save(user);
  }

  async initializeAdmin(): Promise<boolean> {
    let credentials = this.credentials;
    let existingAdmin = await this.userRepository.get(credentials.email);
    if (existingAdmin) {
      return false;
    } else {
      let adminUser: User = {
        email: credentials.email,
        password: credentials.password,
        role: Role.Owner,
        profile: {
          name: "Admin"
        },
        createdAt: new Date()
      };
      this.createUser(adminUser);
      return true;
    }
  }
}

export { AuthService };
