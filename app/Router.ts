import * as express from 'express'
import * as jwt from 'express-jwt'
import { config } from '../config'
import { SampleMiddleware } from './middlewares/SampleMiddleware'
import { JWTRoute } from './routes/JWTRoute'
import { SampleRoute } from './routes/SampleRoute'

interface IRoute {
    path: string,
    middleware: any[]
    handler: express.Router
}

export class Routes {

    public routes: IRoute[]
    public SampleRoute: SampleRoute
    public JWTRoute: JWTRoute
    public SampleMiddleware: SampleMiddleware

    constructor() {
        this.SampleRoute = new SampleRoute()
        this.JWTRoute = new JWTRoute()
        this.SampleMiddleware = new SampleMiddleware()
        this.loadRoutes()
    }

    private loadRoutes(): void {
        this.routes = [{
            path: "/",
            middleware: [this.SampleMiddleware.anyCheck, this.SampleMiddleware.anyCheckTwo],
            handler: this.SampleRoute.router,
        },{
            path: "/JWT",
            middleware: [],
            handler: this.JWTRoute.router,
        },
        {
            path: "/sample",
            middleware: jwt({secret: config.SECRET}),
            handler: this.SampleRoute.router,
        }]
    }

}
