import { createConnection } from "typeorm";
import { Sample } from "../app/models/Sample.model";
import { config, DIALECT } from "../config";
import { OrmLogger } from "./Logger";
export const Connection = createConnection({
    database: config.DATABASE.DB,
    entities: [
        Sample,
    ],
    host: config.DATABASE.SERVER,
    logging: true,
    password: config.DATABASE.PASSWORD,
    port: config.DATABASE.PORT_DB,
    synchronize: true,
    type: DIALECT,
    // tslint:disable-next-line:object-literal-sort-keys
    logger: new OrmLogger(),
    username: config.DATABASE.USER_DB,
    // tslint:disable-next-line:object-literal-sort-keys
    connectTimeout: 100000,
    maxQueryExecutionTime: 6000,
});
