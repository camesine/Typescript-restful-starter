import { Options } from "morgan";
import { Logger } from "typeorm";
import * as winston from "winston";
import {config} from "../config";

const logger = winston.createLogger();

logger.configure({
    exitOnError: false,
    transports: [
      new winston.transports.File(config.LOGGER.file),
      new winston.transports.Console(),
    ],
  });
logger.stream({
    write(message: any, encoding: any) {
      logger.info(message);
    },
});
export const morganOption: Options = {
    stream: {
      write(message: string) {
          logger.info(message.trim());
      },
    },
};
export  class OrmLogger implements Logger {
    // tslint:disable-next-line:max-line-length
    public logQuery(query: string, parameters?: any[], queryRunner?: import ("../node_modules/typeorm/query-runner/QueryRunner").QueryRunner) {
        logger.info(query);
    }
    // tslint:disable-next-line:max-line-length
    public logQueryError(error: string, query: string, parameters?: any[], queryRunner?: import ("../node_modules/typeorm/query-runner/QueryRunner").QueryRunner) {
        logger.error(query, error);
    }
    // tslint:disable-next-line:max-line-length
    public logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: import ("../node_modules/typeorm/query-runner/QueryRunner").QueryRunner) {
        logger.warning(query, time);
    }
    // tslint:disable-next-line:max-line-length
    public logSchemaBuild(message: string, queryRunner?: import ("../node_modules/typeorm/query-runner/QueryRunner").QueryRunner) {
        logger.debug(message);
    }
    // tslint:disable-next-line:max-line-length
    public logMigration(message: string, queryRunner?: import ("../node_modules/typeorm/query-runner/QueryRunner").QueryRunner) {
        logger.debug(message);
    }
    // tslint:disable-next-line:max-line-length
    public log(level: "log" | "info" | "warn", message: any, queryRunner?: import ("../node_modules/typeorm/query-runner/QueryRunner").QueryRunner) {
        logger.info(level, message);
    }

}

export default logger;
