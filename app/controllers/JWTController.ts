import * as express from 'express'
import { Service } from '../services/JWTService'

export class JWTController {

    public async index(req: express.Request, res: express.Response): Promise<any> {
        const token = await Service.signToken({name: "hector", rol: "1"})
        res.send(token)
    }

}
