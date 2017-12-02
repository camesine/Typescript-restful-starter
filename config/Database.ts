import { config } from '../config'
import { createConnection } from 'typeorm'
import { Sample } from '../app/entity/Sample'

const SERVER = process.env.SERVER || config.DATABASE.SERVER || 'localhost'
const DATABASE = process.env.DB || config.DATABASE.DB || "test"
const USER = process.env.USER_DB || config.DATABASE.USER_DB || 'root'
const PASSWORD = process.env.PASSWORD || config.DATABASE.PASSWORD || ''
const DIALECT = process.env.DIALECT || config.DATABASE.DIALECT || 'mysql'

export const Connection = createConnection({
    type: DIALECT,
    host: SERVER,
    port: 3306,
    username: USER,
    password: PASSWORD,
    database: DATABASE,
    entities: [
        Sample
    ],
    synchronize: true,
    logging: false
})
