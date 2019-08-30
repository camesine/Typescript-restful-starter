import * as express from "express";

export abstract class Router {

    public router: express.Router;
    private controller: any;

    constructor(controller: any) {
        this.controller = controller;
        this.router = express.Router();
    }

    protected handler(action: () => void): any {
        return (req: Request, res: Response) => action.call(new this.controller(req, res));
    }

}
