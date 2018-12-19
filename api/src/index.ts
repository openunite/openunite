import { createServer } from "./Server";
import { createRouter } from "./Router";

async function start() {
  const router = createRouter();
  const server = createServer(router);
  server.listen(8000);
}

start();
