import * as express from "express";

export abstract class Controller {

    public req: express.Request;
    public res: express.Response;

    constructor(req: express.Request, res: express.Response) {
        this.req = req;
        this.res = res;
    }

}
