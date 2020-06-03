import { createConnection } from "typeorm";
import { environment } from "../env";

export const Connection = createConnection({
    database: environment.db.database,
    entities: environment.app.dirs.entities,
    host: environment.app.host,
    logging: false,
    password: environment.db.password,
    port: environment.db.port,
    synchronize: environment.db.synchronize,
    type: environment.db.type as any,
    username: environment.db.username,
});
