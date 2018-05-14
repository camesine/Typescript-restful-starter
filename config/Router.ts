import * as express from "express";
import * as jwt from "express-jwt";
import { anyCheck, anyCheckTwo } from "../app/middlewares/Sample.middleware";
import { JWTRoute } from "../app/routes/Jwt.route";
import { SampleRoute } from "../app/routes/Sample.route";
import { config } from "../config";

interface IROUTER {
  path: string;
  middleware: any[];
  handler: express.Router;
}

export const ROUTER: IROUTER[] = [{
  handler: JWTRoute,
  middleware: [],
  path: "/JWT",
}, {
  handler: SampleRoute,
  middleware: jwt({secret: config.SECRET}),
  path: "/sample",
}, {
  handler: SampleRoute,
  middleware: [anyCheck, anyCheckTwo],
  path: "/",
}];
