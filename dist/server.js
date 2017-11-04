"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cluster = require("cluster");
const cors = require("cors");
const express = require("express");
const http = require("http");
const methodOverride = require("method-override");
const Connection_1 = require("./config/db/Connection");
const os_1 = require("os");
const Router_1 = require("./app/Router");
const config_1 = require("./config");
class AppServer {
    constructor() {
        this.app = express();
        // this.expressConfig()
        // this.routerConfig()
    }
    expressConfig() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(methodOverride());
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
            next();
        });
        this.app.use(cors());
        this.app.use((err, req, res, next) => {
            const error = new Error("Not found");
            err.status = 404;
            next(err);
        });
    }
    routerConfig() {
        const r = new Router_1.Routes();
        r.routes.forEach((row) => {
            this.app.use(row.path, row.middleware, row.handler);
        });
        this.app.use((req, res, next) => {
            res.status(404);
            res.json({
                error: 'Not found',
            });
            next();
        });
        this.app.use((err, req, res, next) => {
            if (err.name === 'UnauthorizedError') {
                res.status(401).json({
                    error: 'Please send a valid Token...',
                });
            }
            next();
        });
        this.app.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.json({
                error: err.message,
            });
            next();
        });
    }
    ConnectDB() {
        return Connection_1.Connection;
    }
}
if (cluster.isMaster) {
    const numCPUs = os_1.cpus().length;
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
}
else {
    const port = process.env.PORT || config_1.config.PORT || 3000;
    const appServer = new AppServer();
    appServer.ConnectDB().then(conn => {
        const app = appServer.app;
        const server = http.createServer(app);
        appServer.expressConfig();
        appServer.routerConfig();
        server.listen(port);
        server.on("error", onError);
        server.on("listening", onListening);
        function onListening() {
            const addr = server.address();
            const bind = typeof addr === "string"
                ? "pipe " + addr
                : "port " + addr.port;
            console.log('Server is running in process ' + process.pid + ' listening on PORT ' + addr.port + '\n');
        }
        function onError(error) {
            if (error.syscall !== "listen") {
                throw error;
            }
            const bind = typeof port === "string"
                ? "Pipe " + port
                : "Port " + port;
            switch (error.code) {
                case "EACCES":
                    console.error(bind + " requires elevated privileges");
                    process.exit(1);
                    break;
                case "EADDRINUSE":
                    console.error(bind + " is already in use");
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        }
    });
}
//# sourceMappingURL=server.js.map