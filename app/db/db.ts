import * as Sequelize from 'sequelize'
import { config } from '../../config/config'

const SERVER = config.DATABASE.SERVER || 'localhost'
const DATABASE = config.DATABASE.DB || "test"
const USER = config.DATABASE.USER || 'root'
const PASSWORD = config.DATABASE.PASSWORD || ''
const DIALECT = config.DATABASE.DIALECT || 'mariadb'

export const db = new Sequelize(DATABASE, USER, PASSWORD,{
        host: SERVER,
        dialect: DIALECT,
    })
