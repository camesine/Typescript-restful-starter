import { config, DIALECT } from '../config'
import { createConnection } from 'typeorm'
import { Sample } from '../app/entity/Sample'

export const Connection = createConnection({
    type: DIALECT,
    host: config.DATABASE.SERVER,
    port: config.DATABASE.PORT_DB,
    username: config.DATABASE.USER_DB,
    password: config.DATABASE.PASSWORD,
    database: config.DATABASE.DB,
    entities: [
        Sample
    ],
    synchronize: true,
    logging: false
})
