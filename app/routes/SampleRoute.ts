import * as express from 'express'
import { SampleController } from '../controllers/SampleController'
import { SampleMiddleware } from '../middlewares/SampleMiddleware'

export class SampleRoute {

    public static getRoutes(): express.Router {

        const Router = express.Router()

        Router.get('/', SampleController.All)
        Router.get('/:id', SampleController.Find)
        Router.post('/', [SampleMiddleware.CheckCreate], SampleController.Create)
        Router.put('/', [SampleMiddleware.CheckUpdate], SampleController.Update)
        Router.delete('/', [SampleMiddleware.CheckDelete], SampleController.Delete)

        return Router

    }

}
