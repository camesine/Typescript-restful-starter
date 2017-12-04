import * as express from 'express'
import * as jwt from 'express-jwt'
import { config } from '../config'
import { SampleMiddleware } from '../app/middlewares/SampleMiddleware'
import { JWTRoute } from '../app/routes/JWTRoute'
import { SampleRoute } from '../app/routes/SampleRoute'

interface IROUTER {
    path: string,
    middleware: any[]
    handler: express.Router
}

export class ROUTER {

    public static Routes: IROUTER[] = [{
        path: "/",
        middleware: [SampleMiddleware.anyCheck, SampleMiddleware.anyCheckTwo],
        handler: SampleRoute.Routes,
    },{
        path: "/JWT",
        middleware: [],
        handler: JWTRoute.getRoutes(),
    },
    {
        path: "/sample",
        middleware: jwt({secret: config.SECRET}),
        handler: SampleRoute.Routes,
    }]

}
