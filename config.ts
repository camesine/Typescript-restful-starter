const LOCAL_CONFIGURATION = {
    SERVER: "127.0.0.1",
    PORT_DB: 3306,
    DB: "test",
    USER_DB: "root",
    PASSWORD: "",
    DIALECT: "mysql",
}

const PRODUCTION_CONFIGURATION = {
    SERVER: process.env.SERVER || 'localhost',
    DB: process.env.DB || "prod",
    PORT_DB: process.env.PORT_DB || 3306,
    USER_DB: process.env.USER_DB || 'root',
    PASSWORD: process.env.PASSWORD || '',
    DIALECT: process.env.DIALECT || 'mysql',
}

export const config = {
    SECRET: "HltH3R3",
    PORT_APP: 1344,
    DATABASE: process.env.NODE_ENV === 'PRODUCTION' ? PRODUCTION_CONFIGURATION : LOCAL_CONFIGURATION
}
