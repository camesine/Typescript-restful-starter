import * as express from 'express'
import { JWTService } from '../services/JWTService'

export class JWTController {

    public Service: JWTService

    constructor() {
        this.Service = new JWTService()
    }

    public index = async (req: express.Request, res: express.Response) => {
        const token = await this.Service.signToken({name: "hector", rol: "1"})
        res.send(token)
    }

}
