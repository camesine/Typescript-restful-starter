import * as express from 'express'
import { AnyMiddleware } from './middlewares/AnyMiddleware'
import { AnyRoute } from './routes/anyRoute'
import { JWTRoute } from './routes/jwtRoute'

interface IRoute {
    path: string,
    middleware: any[]
    handler: express.Router
}

export class Routes {

    public routes: IRoute[]
    public anyRoute: AnyRoute
    public JWTRoute: JWTRoute
    public anyMiddleware: AnyMiddleware

    constructor() {
        this.anyRoute = new AnyRoute()
        this.JWTRoute = new JWTRoute()
        this.anyMiddleware = new AnyMiddleware()
        this.loadRoutes()
    }

    private loadRoutes(): void {
        this.routes = [{
            path: "/any",
            middleware: [this.anyMiddleware.anyCheck, this.anyMiddleware.anyCheckTwo],
            handler: this.anyRoute.router,
        },{
            path: "/JWT",
            middleware: [],
            handler: this.JWTRoute.router,
        }]
    }

}
