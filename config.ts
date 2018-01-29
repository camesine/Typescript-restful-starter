import { env } from 'process'

export const DIALECT = 'mysql'

const LOCAL_CONFIGURATION = {
    SERVER: '127.0.0.1',
    PORT_DB: 3306,
    DB: 'test',
    USER_DB: 'root',
    PASSWORD: ''
}

const PRODUCTION_CONFIGURATION = {
    SERVER: env.SERVER || 'localhost',
    DB: env.DB || 'prod',
    PORT_DB: Number(env.PORT_DB) || 3306,
    USER_DB: env.USER_DB || 'root',
    PASSWORD: env.PASSWORD || ''
}

export const config = {
    SECRET: 'HltH3R3',
    PORT_APP: 1344,
    DATABASE: env.NODE_ENV === 'PRODUCTION' ? PRODUCTION_CONFIGURATION : LOCAL_CONFIGURATION
}
