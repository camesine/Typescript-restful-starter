import {
    getOsEnv,
    getOsEnvOptional,
    getOsPath,
    getOsPaths,
    normalizePort,
    toBool,
    toNumber,
} from "./lib/env";

/**
 * Environment variables
 */
export const environment = {
    app: {
        dirs: {
            entities: getOsPaths("TYPEORM_ENTITIES"),
            entitiesDir: getOsPath("TYPEORM_ENTITIES_DIR"),
            middlewares: getOsPaths("MIDDLEWARES"),
        },
        host: getOsEnv("APP_HOST"),
        name: getOsEnv("APP_NAME"),
        port: normalizePort(process.env.PORT || getOsEnv("APP_PORT")),
        schema: getOsEnv("APP_SCHEMA"),
        secret: getOsEnv("APP_SECRET"),
    },
    db: {
        database: getOsEnv("TYPEORM_DATABASE"),
        host: getOsEnvOptional("TYPEORM_HOST"),
        logging: getOsEnv("TYPEORM_LOGGING"),
        password: getOsEnvOptional("TYPEORM_PASSWORD"),
        port: toNumber(getOsEnvOptional("TYPEORM_PORT")),
        synchronize: toBool(getOsEnvOptional("TYPEORM_SYNCHRONIZE")),
        type: getOsEnv("TYPEORM_CONNECTION"),
        username: getOsEnvOptional("TYPEORM_USERNAME"),
    },
    isDevelopment: process.env.NODE_ENV === "DEVELOPMENT",
    isProduction: process.env.NODE_ENV === "PRODUCTION",
    isTest: process.env.NODE_ENV === "test",
    node: process.env.NODE_ENV || "DEVELOPMENT",
};
