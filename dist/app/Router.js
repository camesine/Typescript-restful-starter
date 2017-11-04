"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("express-jwt");
const config_1 = require("../config");
const SampleMiddleware_1 = require("./middlewares/SampleMiddleware");
const JWTRoute_1 = require("./routes/JWTRoute");
const SampleRoute_1 = require("./routes/SampleRoute");
class Routes {
    constructor() {
        this.SampleRoute = new SampleRoute_1.SampleRoute();
        this.JWTRoute = new JWTRoute_1.JWTRoute();
        this.SampleMiddleware = new SampleMiddleware_1.SampleMiddleware();
        this.loadRoutes();
    }
    loadRoutes() {
        this.routes = [{
                path: "/",
                middleware: [this.SampleMiddleware.anyCheck, this.SampleMiddleware.anyCheckTwo],
                handler: this.SampleRoute.router,
            }, {
                path: "/JWT",
                middleware: [],
                handler: this.JWTRoute.router,
            },
            {
                path: "/sample",
                middleware: jwt({ secret: config_1.config.SECRET }),
                handler: this.SampleRoute.router,
            }];
    }
}
exports.Routes = Routes;
//# sourceMappingURL=Router.js.map