import { createConnection } from "typeorm";
import { Sample } from "../app/entity/Sample";
import { config, DIALECT } from "../config";

export const Connection = createConnection({
  database: config.DATABASE.DB,
  entities: [
    "app/entity/**/*{.js,.ts}",
  ],
  host: config.DATABASE.SERVER,
  logging: false,
  password: config.DATABASE.PASSWORD,
  port: config.DATABASE.PORT_DB,
  synchronize: true,
  type: DIALECT,
  username: config.DATABASE.USER_DB,
});
