import { env } from "process";

const LOCAL_CONFIGURATION = {
    DB: "test",
    DIALECT: "mysql",
    PASSWORD: "root",
    PORT_DB: 3306,
    SERVER: "127.0.0.1",
    USER_DB: "root",
};

const PRODUCTION_CONFIGURATION = {
    DB: process.env.DB || "prod",
    DIALECT: process.env.DIALECT || "mysql",
    PASSWORD: process.env.PASSWORD || "",
    PORT_DB: Number(process.env.PORT_DB) || 3306,
    SERVER: process.env.SERVER || "localhost",
    USER_DB: process.env.USER_DB || "root",
};

export function isProduction(): boolean {
    return env.NODE_ENV === "PRODUCTION";
}

export const config = {
    DATABASE: isProduction() ? PRODUCTION_CONFIGURATION : LOCAL_CONFIGURATION,
    PORT_APP: 3000,
    SECRET: env.SECRET,
};
