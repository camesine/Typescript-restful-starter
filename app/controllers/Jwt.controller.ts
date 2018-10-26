import * as express from "express";
import { JWTService } from "../services/Jwt.service";
import { Controller } from "./Controller";

export class JWTController extends Controller {

    private jwtService: JWTService;

    constructor(req: express.Request, res: express.Response) {
        super(req, res);
        this.jwtService = new JWTService();
    }

    public async index(): Promise<express.Response> {
        const payload = this.req.body.payload;
        const token = await this.jwtService.signToken(payload);
        return this.res.send(token);
    }

}
