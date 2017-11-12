import * as express from 'express'
import { SampleController } from '../controllers/SampleController'

export class SampleRoute {

    public static getRoutes(): express.Router {

        const Router = express.Router()
        const Controller = new SampleController()

        Router.get('/', Controller.Index)
        Router.get('/:id', Controller.Find)
        Router.post('/', Controller.Create)
        Router.put('/', Controller.Update)
        Router.delete('/', Controller.delete)

        return Router

    }

}
