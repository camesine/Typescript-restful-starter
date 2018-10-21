import * as express from "express";
import * as JWT from "jsonwebtoken";
import * as bearer from "token-extractor";
import { config } from "../../config";

export class JWTService {

    public static signToken(params: { name: string, role: string }, options?: any): string {
        return JWT.sign(params, config.SECRET, options || undefined);
    }

    public static extractToken(req: express.Request) {
        return new Promise((resolve, reject) => {
            bearer(req, (err: Error, token: string) => {
                if (err) {
                    reject(err);
                }
                resolve(token);
            });
        });
    }

}
