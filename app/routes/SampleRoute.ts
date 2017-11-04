import * as express from 'express'
import { SampleController } from '../controllers/SampleController'

export class SampleRoute {

    public router: express.Router
    private Controller: SampleController

    constructor() {
        this.router = express.Router()
        this.Controller = new SampleController()
        this.loadActions()
    }

    private loadActions() {
        this.router.get('/', this.Controller.Index)
        this.router.get('/:id', this.Controller.Find)
        this.router.post('/', this.Controller.Create)
        this.router.put('/', this.Controller.Update)
        this.router.delete('/', this.Controller.delete)
    }

}
