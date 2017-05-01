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
        this.router.get('/', this.Controller.index)
        this.router.get('/:id', this.Controller.find)
        this.router.post('/', this.Controller.create)
        this.router.put('/', this.Controller.update)
        this.router.delete('/', this.Controller.delete)
    }

}
