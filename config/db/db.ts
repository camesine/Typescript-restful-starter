import * as Sequelize from 'sequelize'
import { config } from '../../config'

const SERVER = process.env.SERVER || config.DATABASE.SERVER || 'localhost'
const DATABASE = process.env.DB || config.DATABASE.DB || "test"
const USER = process.env.USER || config.DATABASE.USER || 'root'
const PASSWORD = process.env.PASSWORD || config.DATABASE.PASSWORD || ''
const DIALECT = process.env.DIALECT || config.DATABASE.DIALECT || 'mariadb'

export const db = new Sequelize(DATABASE, USER, PASSWORD,{
        host: SERVER,
        dialect: DIALECT,
    })
