import { Request, Response, Router } from "express";
import { SampleController } from "../controllers/Sample.controller";
import { createSchema, deleteSchema, updateSchema } from "../middlewares/schemas/Sample.schemas";
import { validator } from "../middlewares/Validator.middleware";

const Controller = new SampleController();

export const SampleRoute: Router = Router()
    .get("/", (req: Request, res: Response) => Controller.all(req, res))
    .get("/:id", (req: Request, res: Response) => Controller.find(req, res))
    .post("/", [ validator(createSchema) ], (req: Request, res: Response) => Controller.create(req, res))
    .put("/", [ validator(updateSchema) ], (req: Request, res: Response) => Controller.update(req, res))
    .delete("/", [ validator(deleteSchema) ], (req: Request, res: Response) => Controller.delete(req, res));
