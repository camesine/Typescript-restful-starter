import * as express from 'express'
import { JWTService } from '../services/JWTService'

export class JWTController {

    public Service: JWTService

    constructor() {
        this.Service = new JWTService()
    }

    public index = async (req: express.Request, res: express.Response) => {
        const payload = req.body.payload
        const token = await this.Service.signToken(payload)
        res.send(token)
    }

}
