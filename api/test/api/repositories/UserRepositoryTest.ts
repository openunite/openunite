import { getPgConnection, testConnectionOpts } from "./PGConnection";
import { Docker } from "node-docker-api";
import { Container } from "node-docker-api/lib/container";
import { migrate } from "../../../db/Migrate";
import "should";
import {
  UserRepository,
  PGUserRepository
} from "@openunite/src/repositories/UserRepository";

const docker = new Docker({ socketPath: "/var/run/docker.sock" });

describe("User Repository", () => {
  let container: Container;
  let userRepository: UserRepository;

  beforeEach(async function() {
    this.timeout(5000);
    try {
      container = await docker.container.create({
        name: "UserRepositoryTest-" + new Date().getTime(),
        Image: "postgres:10",
        Env: [
          "POSTGRES_PASSWORD=" + testConnectionOpts.password,
          "POSTGRES_USER=" + testConnectionOpts.username,
          "POSTGRES_DB=" + testConnectionOpts.database
        ],
        HostConfig: {
          PortBindings: {
            "5432/tcp": [{ HostPort: "" + testConnectionOpts.port }]
          }
        }
      });
      container.start();
      const pgConnection = await getPgConnection(testConnectionOpts);
      await migrate({
        database: testConnectionOpts.database,
        user: testConnectionOpts.username,
        password: testConnectionOpts.password,
        host: "localhost",
        port: testConnectionOpts.port
      });
      userRepository = new PGUserRepository(pgConnection);
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    }
  });

  afterEach(async () => {
    await container.stop({ t: 1 });
    await container.delete({ force: true });
  });

  it("Save a user successfully", async () => {
    // act
    const result = await userRepository.findAll({});
    // assert
    result.should.deepEqual([]);
  });
});
