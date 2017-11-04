import { config } from '../../config'
import { createConnection } from 'typeorm'

const SERVER = process.env.SERVER || config.DATABASE.SERVER || 'localhost'
const DATABASE = process.env.DB || config.DATABASE.DB || "test"
const USER = process.env.USER || config.DATABASE.USER || 'root'
const PASSWORD = process.env.PASSWORD || config.DATABASE.PASSWORD || ''
const DIALECT = process.env.DIALECT || config.DATABASE.DIALECT || 'mariadb'

export const Connection = createConnection({
    type: DIALECT,
    host: SERVER,
    port: 3306,
    username: USER,
    password: PASSWORD,
    database: DATABASE,
    entities: [
        
    ],
    synchronize: true,
    logging: false
})
