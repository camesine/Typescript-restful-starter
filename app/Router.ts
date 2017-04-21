import * as express from 'express'
import * as homeRoutes from './routes/homeRoute'

interface IRoute {
    path: string,
    handler: express.Router
}

export class Routes {

    public routes: IRoute[]

    constructor() {
        this.loadRoutes()
    }

    private loadRoutes(): void {
        this.routes = [{
            path: "/home",
            handler: homeRoutes.default,
        }]
    }

}
