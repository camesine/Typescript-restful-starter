import * as express from "express";
import { SampleController } from "../controllers/Sample.controller";
import { createSchema, deleteSchema, updateSchema } from "../middlewares/schemas/Sample.schemas";
import { validator } from "../middlewares/Validator.middleware";

export const SampleRoute: express.Router = express.Router()
    .get("/", SampleController.all)
    .get("/:id", SampleController.find)
    .post("/", [ validator(createSchema) ], SampleController.create)
    .put("/", [ validator(updateSchema) ], SampleController.update)
    .delete("/", [ validator(deleteSchema) ], SampleController.delete);
