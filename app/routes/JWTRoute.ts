import * as express from 'express'
import { JWTController } from '../controllers/JWTController'

export class JWTRoute {

    public static getRoutes(): express.Router {

        const Router = express.Router()

        Router.post('/', JWTController.Index)

        return Router

    }

}
