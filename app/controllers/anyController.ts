import * as express from 'express'

export class AnyController {

    public index(req: express.Request, res: express.Response): void {
        res.send("ANY INDEX")
    }

    public home(req: express.Request, res: express.Response): void {
        res.send("ANY HOME")
    }

}
