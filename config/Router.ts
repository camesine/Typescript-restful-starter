import * as express from "express";
import * as jwt from "express-jwt";
import { JwtRouter, SampleRouter } from "../app/routes";
import { environment } from "../env";

interface IROUTER {
    path: string;
    middleware: any[];
    handler: express.Router;
}

const Sample = new SampleRouter();
const JWT = new JwtRouter();

export const ROUTER: IROUTER[] = [{
    handler: JWT.router,
    middleware: [],
    path: "/JWT",
}, {
    handler: Sample.router,
    middleware: [
        jwt({ secret: environment.app.secret }),
    ],
    path: "/sample",
}, {
    handler: Sample.router,
    middleware: [],
    path: "/",
}];
