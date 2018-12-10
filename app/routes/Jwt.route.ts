import { Router } from "camesine";
import { JWTController } from "../controllers";

export class JwtRouter extends Router {
    constructor() {
        super(JWTController);
        this.router
            .post("/", this.handler(JWTController.prototype.index));
    }
}
