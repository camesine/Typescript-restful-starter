import * as express from "express";
import * as jwt from "express-jwt";
import { anyCheck, anyCheckTwo } from "../app/middlewares/SampleMiddleware";
import { JWTRoute } from "../app/routes/JWTRoute";
import { SampleRoute } from "../app/routes/SampleRoute";
import { config } from "../config";

interface IROUTER {
  path: string;
  middleware: any[];
  handler: express.Router;
}

export const ROUTER: IROUTER[] = [{
  handler: SampleRoute,
  middleware: [anyCheck, anyCheckTwo],
  path: "/",
}, {
  handler: JWTRoute,
  middleware: [],
  path: "/JWT",
}, {
  handler: SampleRoute,
  middleware: jwt({secret: config.SECRET}),
  path: "/sample",
}];
