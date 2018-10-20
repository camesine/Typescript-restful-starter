import { env } from "process";

export const DIALECT = "mysql";

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
