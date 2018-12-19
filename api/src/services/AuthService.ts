import UserLogin from "../models/login/UserLogin";
import LoginResult from "../models/login/LoginResult";
import JWT from "../models/login/JWT";
import jsonwebtoken from "jsonwebtoken";

const adminUser = process.env.ADMIN_USER || "admin";
const adminPassword = process.env.ADMIN_USER || "password";
const privateKey = process.env.PRIVATE_KEY || "secret";

const jwtOptions = {
  expiresIn: "1 day"
};
export const login = async (userLogin: UserLogin): Promise<LoginResult> => {
  if (
    userLogin.username === adminUser &&
    userLogin.password === adminPassword
  ) {
    let payload: JWT = {
      sub: 1,
      name: "admin",
      iat: new Date().getTime()
    };

    let token = jsonwebtoken.sign(payload, privateKey, jwtOptions);
    return { token };
  } else {
    return {};
  }
};
