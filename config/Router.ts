import * as express from 'express'
import * as jwt from 'express-jwt'
import { config } from '../config'
import { anyCheck, anyCheckTwo } from '../app/middlewares/SampleMiddleware'
import { JWTRoute } from '../app/routes/JWTRoute'
import { SampleRoute } from '../app/routes/SampleRoute'

interface IROUTER {
    path: string,
    middleware: any[]
    handler: express.Router
}

export const ROUTER: IROUTER[] = [{
    path: "/",
    middleware: [anyCheck, anyCheckTwo],
    handler: SampleRoute,
},{
    path: "/JWT",
    middleware: [],
    handler: JWTRoute,
},
{
    path: "/sample",
    middleware: jwt({secret: config.SECRET}),
    handler: SampleRoute,
}]
