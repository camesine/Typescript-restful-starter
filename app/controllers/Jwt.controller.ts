import * as express from "express";
import { JWTService } from "../services/Jwt.service";

export class JWTController {

    public static async Index(req: express.Request, res: express.Response) {
        const payload = req.body.payload;
        const token = await JWTService.signToken(payload);
        return res.send(token);
    }
}
