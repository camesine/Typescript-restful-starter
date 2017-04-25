import * as express from 'express'

export class AnyController {

    public index = async (req: express.Request, res: express.Response) => {
        res.send({route: "ANY INDEX"})
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
