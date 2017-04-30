import * as express from 'express'
import { AnyController } from '../controllers/anyController'

export class AnyRoute {

    public router: express.Router
    private Controller: AnyController

    constructor() {
        this.router = express.Router()
        this.Controller = new AnyController()
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
