import { env } from 'process'

const LOCAL_CONFIGURATION = {
    SERVER: "127.0.0.1",
    PORT_DB: 3306,
    DB: "test",
    USER_DB: "root",
    PASSWORD: "",
    DIALECT: "mysql",
}

const PRODUCTION_CONFIGURATION = {
    SERVER: env.SERVER || 'localhost',
    DB: env.DB || "prod",
    PORT_DB: env.PORT_DB || 3306,
    USER_DB: env.USER_DB || 'root',
    PASSWORD: env.PASSWORD || '',
    DIALECT: env.DIALECT || 'mysql',
}

export const config = {
    SECRET: "HltH3R3",
    PORT_APP: 1344,
    DATABASE: env.NODE_ENV === 'PRODUCTION' ? PRODUCTION_CONFIGURATION : LOCAL_CONFIGURATION
}
