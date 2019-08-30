import { JWTController } from "../controllers";
import { Router } from "./Router";

export class JwtRouter extends Router {
    constructor() {
        super(JWTController);
        this.router
            .post("/", this.handler(JWTController.prototype.index));
    }
}
