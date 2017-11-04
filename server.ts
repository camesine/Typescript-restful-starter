import * as bodyParser from 'body-parser'
import * as cluster from 'cluster'
import * as cors from 'cors'
import * as express from 'express'
import * as http from 'http'
import * as methodOverride from 'method-override'
import { Connection } from './config/db/Connection'
import { cpus } from 'os'
import { Routes } from './app/Router'
import { config } from './config'

class AppServer {

    public app: express.Application
    public routes: express.Router

    constructor() {
       this.app = express()
       // this.expressConfig()
       // this.routerConfig()
    }

    public expressConfig(): void {
        this.app.use(bodyParser.urlencoded({extended: true}))
        this.app.use(bodyParser.json({ limit: '50mb'} ))
        this.app.use(methodOverride())

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

    public routerConfig(): void {
        const r = new Routes()
        r.routes.forEach((row) => {
            this.app.use(row.path, row.middleware, row.handler)
        })

        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction): void => {
            res.status(404)
            res.json({
                error: 'Not found',
            })
            next()
        })

        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void  => {
            if (err.name === 'UnauthorizedError') {
                res.status(401).json({
                    error: 'Please send a valid Token...',
                })
            }
            next()
        })

        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
            res.status(err.status || 500)
            res.json({
                error: err.message,
            })
            next()
        })
    }

    public ConnectDB(): Promise<any> {
        return Connection
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

    const port: number = process.env.PORT || config.PORT || 3000
    const appServer = new AppServer()

    appServer.ConnectDB().then(conn => {
        const app = appServer.app
        const server = http.createServer(app)
        appServer.expressConfig()
        appServer.routerConfig()
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
    })
 

}
