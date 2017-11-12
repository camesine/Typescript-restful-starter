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

}