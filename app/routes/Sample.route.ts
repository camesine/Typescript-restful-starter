import { Router, validator } from "camesine";
import { SampleController } from "../controllers";
import { createSample, deleteSample, updateSample } from "../schemas";

export class SampleRouter extends Router {
    constructor() {
        super(SampleController);
        this.router
            .get("/", this.handler(SampleController.prototype.all))
            .get("/:id", this.handler(SampleController.prototype.find))
            .post("/", [ validator(createSample) ], this.handler(SampleController.prototype.create))
            .put("/", [ validator(updateSample) ],  this.handler(SampleController.prototype.update))
            .delete("/", [ validator(deleteSample) ], this.handler(SampleController.prototype.delete));
    }
}
