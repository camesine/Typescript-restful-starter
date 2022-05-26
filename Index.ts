import * as cluster from "cluster";
import * as dotenv from "dotenv";
import { cpus } from "os";
import { resolve } from "path";
import { env } from "process";
import { Server } from "./config/Server";
import { environment } from "./env";

dotenv.config({ path: resolve() + "/.env" });

if (cluster.isMaster) {
    console.log(`\n -------------------> RUN ${env.NODE_ENV} ENVIRONMENT \n`);
    for (const _ of cpus()) {
        cluster.fork();
        if (!environment.isProduction) {
            break;
        }
    }
    cluster.on("exit", (worker, code, signal) => {
        console.log("Worker " + worker.process.pid + " died with code: " + code + ", and signal: " + signal);
        console.log("Starting a new worker");
        cluster.fork();
    });
} else {
    const port: number = Number(env.PORT) || Number(environment.app.port) || 3000;
    new Server().start().then((server) => {
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
            const route = () => `${environment.app.schema}://${environment.app.host}:${port}/`;
            console.log(``);
            console.log(`Server is running in process ${process.pid} on ${route()}`);
            console.log(`To shut it down, press <CTRL> + C at any time.`);
        });
    });
}
