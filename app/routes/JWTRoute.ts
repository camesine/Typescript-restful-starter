import * as express from 'express'
import { JWTController } from '../controllers/JWTController'

export class JWTRoute {

    public static getRoutes(): express.Router {

        const Router = express.Router()
        const Controller = new JWTController()

        Router.post('/', Controller.index)

        return Router

    }

}
