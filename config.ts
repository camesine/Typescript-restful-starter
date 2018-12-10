import { env } from "process";

export const DIALECT = "mysql";

const LOCAL_CONFIGURATION = {
    DB: "test",
    PASSWORD: "",
    PORT_DB: 3306,
    SERVER: "127.0.0.1",
    USER_DB: "root",
};

const PRODUCTION_CONFIGURATION = {
    DB: env.DB,
    PASSWORD: env.PASSWORD,
    PORT_DB: Number(env.PORT_DB),
    SERVER: env.SERVER,
    USER_DB: env.USER_DB,
};

export function isProduction(): boolean {
    return env.NODE_ENV === "PRODUCTION";
}

export const config = {
    DATABASE: isProduction() ? PRODUCTION_CONFIGURATION : LOCAL_CONFIGURATION,
    PORT_APP: 8080,
    SECRET: env.SECRET,
};
