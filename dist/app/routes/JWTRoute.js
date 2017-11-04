"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const JWTController_1 = require("../controllers/JWTController");
class JWTRoute {
    constructor() {
        this.router = express.Router();
        this.Controller = new JWTController_1.JWTController();
        this.loadActions();
    }
    loadActions() {
        this.router.post('/', this.Controller.index);
    }
}
exports.JWTRoute = JWTRoute;
//# sourceMappingURL=JWTRoute.js.map