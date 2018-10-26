import * as express from "express";
import * as jwt from "express-jwt";
import { JWTRoute } from "../app/routes/Jwt.route";
import { SampleRouter } from "../app/routes/Sample.route";
import { config } from "../config";

interface IROUTER {
    path: string;
    middleware: any[];
    handler: express.Router;
}

const Sample = new SampleRouter();

export const ROUTER: IROUTER[] = [{
    handler: JWTRoute,
    middleware: [],
    path: "/JWT",
}, {
    handler: Sample.router,
    middleware: [
        jwt({secret: config.SECRET}),
    ],
    path: "/sample",
}, {
    handler: Sample.router,
    middleware: [],
    path: "/",
}];
