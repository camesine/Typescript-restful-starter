import { Request, Response } from "express";
import { JwtService } from "../services";
import { Controller } from "./Controller";

export class JWTController extends Controller {

    private jwtService: JwtService;

    constructor(req: Request, res: Response) {
        super(req, res);
        this.jwtService = new JwtService();
    }

    public async index(): Promise<Response> {
        const { payload } = this.req.body;
        const token = await this.jwtService.signToken(payload);
        return this.res.send(token);
    }

}
