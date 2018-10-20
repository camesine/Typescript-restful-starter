import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as http from "http";
import * as methodOverride from "method-override";
import * as morgan from "morgan";
import { Options } from "morgan";
import * as swaggerUi from "swagger-ui-express";
import { Connection } from "./Database";
import logger from "./Logger";
import { ROUTER } from "./Router";

export class Server {
    private static ConnectDB(): Promise<any> {
        return Connection;
    }

    private readonly app: express.Application;
    private readonly server: http.Server;

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
    }

    public Start(): Promise<http.Server> {
        return Server.ConnectDB().then(() => {
            this.ExpressConfiguration();
            this.ConfigurationRouter();
            return this.server;
        });
    }

    public App(): express.Application {
        return this.app;
    }

    private ExpressConfiguration(): void {

        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json({ limit: "50mb" }));
        this.app.use(methodOverride());

        this.app.use((req, res, next): void => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
            res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE,OPTIONS");
            next();
        });

        const swaggerDocument = require("../swagger.json");
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.app.use("/api/v1", express.Router);
        const morganOptions: Options = {
            stream: {
                write: (message: string) => {
                    logger.info(message.trim());
                },
            },
        };
        this.app.use(morgan("combined", morganOptions));
        this.app.use(cors());

        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
            err.status = 404;
            next(err);
        });
    }

    private ConfigurationRouter(): void {

        for (const route of ROUTER) {
            this.app.use(route.path, route.middleware, route.handler);
        }

        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction): void => {
            res.status(404);
            res.json({
                error: "Not found",
            });
            next();
        });

        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
            if (err.name === "UnauthorizedError") {
                res.status(401).json({
                    error: "Please send a valid Token...",
                });
            }
            next();
        });

        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
            res.status(err.status || 500);
            res.json({
                error: err.message,
            });
            next();
        });
    }
}
