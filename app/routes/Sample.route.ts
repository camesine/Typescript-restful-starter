import { SampleController } from "../controllers";
import { Validator } from "../middlewares";
import { createSample, deleteSample, updateSample } from "../schemas";
import { Router } from "./Router";

export class SampleRouter extends Router {
    constructor() {
        super(SampleController);
        this.router
            .get("/", this.handler(SampleController.prototype.all))
            .get("/:id", this.handler(SampleController.prototype.find))
            .post("/", [ Validator(createSample) ], this.handler(SampleController.prototype.create))
            .put("/", [ Validator(updateSample) ],  this.handler(SampleController.prototype.update))
            .delete("/", [ Validator(deleteSample) ], this.handler(SampleController.prototype.delete));
    }
}
