import * as express from 'express'
import { AnyMiddleware } from './middlewares/AnyMiddleware'
import { AnyRoute } from './routes/anyRoute'

interface IRoute {
    path: string,
    middleware: any[]
    handler: express.Router
}

export class Routes {

    public routes: IRoute[]
    public anyRoute: AnyRoute
    public anyMiddleware: AnyMiddleware

    constructor() {
        this.anyRoute = new AnyRoute()
        this.anyMiddleware = new AnyMiddleware()
        this.loadRoutes()
    }

    private loadRoutes(): void {
        this.routes = [{
            path: "/any",
            middleware: [this.anyMiddleware.anyCheck, this.anyMiddleware.anyCheckTwo],
            handler: this.anyRoute.router,
        }]
    }

}
