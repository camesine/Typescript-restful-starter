"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const SampleController_1 = require("../controllers/SampleController");
class SampleRoute {
    constructor() {
        this.router = express.Router();
        this.Controller = new SampleController_1.SampleController();
        this.loadActions();
    }
    loadActions() {
        this.router.get('/', this.Controller.Index);
        // this.router.get('/:id', this.Controller.find)
        // this.router.post('/', this.Controller.create)
        // this.router.put('/', this.Controller.update)
        // this.router.delete('/', this.Controller.delete)
    }
}
exports.SampleRoute = SampleRoute;
//# sourceMappingURL=SampleRoute.js.map