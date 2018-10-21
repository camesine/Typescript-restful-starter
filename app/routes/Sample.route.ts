import * as express from "express";
import { SampleController } from "../controllers/Sample.controller";
import * as SampleMiddleware from "../middlewares/Sample.middleware";

export const SampleRoute: express.Router = express.Router()
    .get("/", SampleController.all)
    .get("/:id", SampleController.find)
    .post("/", [ SampleMiddleware.checkCreate ], SampleController.create)
    .put("/", [ SampleMiddleware.checkUpdate ], SampleController.update)
    .delete("/", [ SampleMiddleware.checkDelete ], SampleController.delete);
