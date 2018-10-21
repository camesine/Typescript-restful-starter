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
	DB: env.DB || "prod",
	PASSWORD: env.PASSWORD || "",
	PORT_DB: Number(env.PORT_DB) || 3306,
	SERVER: env.SERVER || "localhost",
	USER_DB: env.USER_DB || "root",
};

const options = {
	file: {
	  level: 'info',
	  filename: './app.log',
	  handleExceptions: true,
	  json: true,
	  maxsize: 5242880, // 5MB
	  maxFiles: 5,
	  colorize: false,
	},
	console: {
	  level: 'debug',
	  handleExceptions: true,
	  json: false,
	  colorize: true,
	},
  };

export const config = {
	DATABASE: env.NODE_ENV === "PRODUCTION" ? PRODUCTION_CONFIGURATION : LOCAL_CONFIGURATION,
	PORT_APP: 1344,
	SECRET: "HltH3R3",
	LOGGER: options
};
