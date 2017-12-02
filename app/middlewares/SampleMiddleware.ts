import * as express from 'express'

export class SampleMiddleware {

    public static anyCheck(req: express.Request, res: express.Response, next: express.NextFunction): void {
        const value: string = "this"
        const value2: string = "this"
        value === value2 ? next() : res.json({ error: 'error anyCheck' })
    }

    public static anyCheckTwo(req: express.Request, res: express.Response, next: express.NextFunction): void {
        const value: string = "this"
        const value2: string = "this"
        value === value2 ? next() : res.json({ error: 'error anyCheck' })
    }

    public static CheckCreate (req: express.Request, res: express.Response, next: express.NextFunction) {

        req.body.text && typeof req.body.text === 'string' ? next() : res.status(404).send({ text: 'ERROR' })

    }

    public static CheckUpdate (req: express.Request, res: express.Response, next: express.NextFunction) {

        req.body.id && req.body.text && typeof req.body.id === 'number' && typeof req.body.text === 'string' ?
        next() : res.status(404).send({ text: 'ERROR' })

    }

    public static CheckDelete (req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id && typeof req.body.id === 'number' ? next() : res.status(404).send({ text: 'ERROR' })
    }

}
