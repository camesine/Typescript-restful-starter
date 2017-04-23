import * as express from 'express'
import { JWTController } from '../controllers/JWTController'

export class JWTRoute {

    public router: express.Router
    private Controller: JWTController

    constructor() {
        this.router = express.Router()
        this.Controller = new JWTController()
        this.loadActions()
    }

    private loadActions() {
        this.router.get('/index', this.Controller.index)
    }

}
