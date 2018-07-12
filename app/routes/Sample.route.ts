import * as express from "express";
import { SampleController } from "../controllers/Sample.controller";
import * as SampleMiddleware from "../middlewares/Sample.middleware";

export const SampleRoute: express.Router = express.Router()
    .get("/", SampleController.All)
    .get("/:id", SampleController.Find)
    .post("/", [SampleMiddleware.CheckCreate], SampleController.Create)
    .put("/", [SampleMiddleware.CheckUpdate], SampleController.Update)
    .delete("/", [SampleMiddleware.CheckDelete], SampleController.Delete);
