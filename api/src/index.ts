import { createServer } from "./Server";
import { createRouter } from "./Router";
import { AuthController } from "./controllers/AuthController";
import { AuthService } from "./services/AuthService";
import { EventService } from "./services/EventService";
import { EventController } from "./controllers/EventController";
import { TokenService } from "./services/TokenService";

async function start(httpPort: number) {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@localhost";
  const adminPassword = process.env.ADMIN_PASSWORD || "password";
  const privateKey = process.env.PRIVATE_KEY || "secret";

  const credentials = {
    email: adminEmail,
    password: adminPassword
  };

  const tokenService = new TokenService(privateKey);
  const authService = new AuthService(credentials, tokenService);
  const authController = new AuthController(authService);

  const eventService = new EventService();
  const eventController = new EventController(eventService);

  const router = createRouter(authController, eventController);
  const server = createServer(router);

  server.listen(httpPort);
}

const httpPort = Number(process.env.HTTP_PORT || 8000);
start(httpPort);
