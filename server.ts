import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as express from 'express'
import * as http from 'http'
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

        this.app.use((req, res, next): void => {
            res.header('Access-Control-Allow-Origin', '*')
            res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization')
            res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS')
            next()
        })

        this.app.use(cors())

        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
            const error = new Error("Not Founded")
            err.status = 404
            next(err)
        })
    }


    private routerConfig(): void {
        const r = new Routes()
        r.routes.forEach((row) => {
            this.app.use(row.path, row.handler)
        })
    }


}

const appServer = new AppServer()
const app = appServer.app
const server = http.createServer(app)

server.listen(8000, () => console.log("LISTENING PORT 8000"))
