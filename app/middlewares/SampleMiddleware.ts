import * as express from 'express'

export class SampleMiddleware {

    public anyCheck(req: express.Request, res: express.Response, next: express.NextFunction): void {

        const value: string = "this"
        const value2: string = "this"

        if (value === value2) {
            next()
        }else {
            res.json({ error: 'error anyCheck' })
        }

    }

    public anyCheckTwo(req: express.Request, res: express.Response, next: express.NextFunction): void {

        const value: string = "this"
        const value2: string = "this"

        if (value === value2) {
            next()
        }else {
            res.json({ error: 'error anyCheck' })
        }

    }

}
