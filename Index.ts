import * as cluster from "cluster";
import { cpus } from "os";
import { env } from "process";
import { config } from "./config";
import logger from "./config/Logger";
import { Server } from "./config/Server";

if (cluster.isMaster) {

    console.log(`\n -------------------> RUN ${env.NODE_ENV} ENVIRONMENT \n`);

    for (const cpu of cpus()) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log("Worker " + worker.process.pid + " died with code: " + code + ", and signal: " + signal);
        console.log("Starting a new worker");
        cluster.fork();
    });

} else {

    const port: number = Number(env.PORT) || config.PORT_APP || 3000;

    try {
        new Server().Start().then((server) => {

            server.listen(port);

            server.on("error", (error: any) => {
                if (error.syscall !== "listen") {
                    throw error;
                }

                switch (error.code) {
                    case "EACCES":
                        console.error("Port requires elevated privileges");
                        process.exit(1);
                        break;
                    case "EADDRINUSE":
                        console.error("Port is already in use");
                        process.exit(1);
                        break;
                    default:
                        throw error;
                }
            });

            server.on("listening", () => {
                console.log("Server is running in process " + process.pid + " listening on PORT " + port + "\n");
            });

        });
    } catch (error) {
        logger.warn(error.stack);
    }
    process
        .on("unhandledRejection", (reason, p) => {
            console.error(reason, "Unhandled Rejection at Promise", p);
            logger.warn(reason.stack, "Unhandled Rejection at Promise ", p);
        })
        .on("uncaughtException", (err) => {
            console.error(err, "Uncaught Exception thrown");
            logger.error(err.stack, "Uncaught Exception thrown");
            process.exit(1);
        })
        .on("warning", (warn) => {
            logger.warn(warn);
        });
}
