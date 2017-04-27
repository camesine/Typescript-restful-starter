import * as express from 'express'
import { User } from '../db/model/User'

export class AnyController {

    public index = async (req: express.Request, res: express.Response) => {
        const data = await User.findAll()
        res.send(data)
    }

    public create = async (req: express.Request, res: express.Response) => {
        res.send({route: "ANY CREATE"})
    }

    public update = async (req: express.Request, res: express.Response) => {
        res.send({route: "ANY UPDATE"})
    }

    public delete = async (req: express.Request, res: express.Response) => {
        res.send({route: "ANY DELETE"})
    }

}
