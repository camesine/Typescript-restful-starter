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
        this.router.get('/index', this.Controller.index)
        this.router.get('/home', this.Controller.home)
    }

}
