import { createConnection, Connection } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import path from "path";

const testConnectionOpts = {
  type: <"postgres">"postgres",
  host: "localhost",
  port: 15432,
  username: "openunite_pg_master",
  password: "admin",
  database: "openunitedb",
  entities: [
    path.resolve(__dirname + "../../../../src/repositories/entities/*.ts")
  ]
};

function getPgConnection(
  connectionOptions: PostgresConnectionOptions
): Promise<Connection> {
  return retry(() => createConnection(connectionOptions));
}

function retry<T>(fn: () => Promise<T>, ms = 1000, maxRetries = 5): Promise<T> {
  return new Promise((resolve, reject) => {
    var retries = 0;
    fn()
      .then(resolve)
      .catch((err) => {
        setTimeout(() => {
          ++retries;
          if (retries == maxRetries) {
            return reject("maximum retries exceeded");
          }
          retry(fn, ms).then(resolve);
        }, ms);
      });
  });
}

export { getPgConnection, testConnectionOpts };
