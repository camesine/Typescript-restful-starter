import * as express from 'express'
import { JWTService } from '../services/JWTService'

export class JWTController {

    public index = async (req: express.Request, res: express.Response) => {
        const payload = req.body.payload
        const token = await JWTService.signToken(payload)
        res.send(token)
    }

}
