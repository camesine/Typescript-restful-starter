import * as express from 'express'
import * as jwt from 'express-jwt'
import { config } from '../config/config'
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
            path: "/",
            middleware: [this.anyMiddleware.anyCheck, this.anyMiddleware.anyCheckTwo],
            handler: this.anyRoute.router,
        },{
            path: "/JWT",
            middleware: [],
            handler: this.JWTRoute.router,
        },
        {
            path: "/any",
            middleware: jwt({secret: config.SECRET}),
            handler: this.anyRoute.router,
        }]
    }

}
