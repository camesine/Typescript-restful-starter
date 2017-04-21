import * as bodyParser from 'body-parser'
import * as cluster from 'cluster'
import * as cors from 'cors'
import * as express from 'express'
import * as http from 'http'
import { cpus } from 'os'
import { Routes } from './app/Router'

class AppServer {

    public app: express.Application
    public routes: express.Router

    constructor() {
        this.app = express()
        this.expressConfig()
        this.routerConfig()
    }

    private expressConfig(): void {
        this.app.use(bodyParser.urlencoded({extended: true}))
        this.app.use(bodyParser.json({ limit: '50mb'} ))

        this.app.use((req, res, next): void => {
            res.header('Access-Control-Allow-Origin', '*')
            res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization')
            res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS')
            next()
        })

        this.app.use(cors())

        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
            const error = new Error("Not found")
            err.status = 404
            next(err)
        })
    }

    private routerConfig(): void {
        const r = new Routes()
        r.routes.forEach((row) => {
            this.app.use(row.path, row.middleware, row.handler)
        })
    }

}


if (cluster.isMaster) {

    const numCPUs = cpus().length
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal)
        console.log('Starting a new worker')
        cluster.fork()
    })

} else {

    const port: number = process.env.PORT || 3000
    const appServer = new AppServer()
    const app = appServer.app
    const server = http.createServer(app)

    server.listen(port)
    server.on("error", onError)
    server.on("listening", onListening)

    function onListening() {
        const addr = server.address()
        const bind = typeof addr === "string"
            ? "pipe " + addr
            : "port " + addr.port
        console.log('Server is running in process ' + process.pid + ' listening on PORT ' + addr.port + '\n')
    }

    function onError(error: any) {
        if (error.syscall !== "listen") {
            throw error
        }

        const bind = typeof port === "string"
            ? "Pipe " + port
            : "Port " + port

        switch (error.code) {
            case "EACCES":
                console.error(bind + " requires elevated privileges")
                process.exit(1)
                break
            case "EADDRINUSE":
                console.error(bind + " is already in use")
                process.exit(1)
                break
            default:
                throw error
        }
    }

}
