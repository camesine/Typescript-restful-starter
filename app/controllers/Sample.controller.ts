import * as express from "express";
import { Sample } from "../models/Sample.model";
import { SampleService } from "../services/Sample.service";

export class SampleController {

    public static async All(req: express.Request, res: express.Response) {
        const SampleList = await SampleService.Find();
        return res.send(SampleList);
    }

    public static async Find(req: express.Request, res: express.Response) {
        const id: number = req.params.id;
        const sample = await SampleService.FindOneById(id);
        return sample ? res.status(200).send(sample) : res.status(404).send({text: "NOT FOUND"});
    }

    public static async Create(req: express.Request, res: express.Response) {
        const text: string = req.body.text;
        const sample = new Sample();
        sample.text = text;
        sample.email = "someone@somewhere.com";

        try {
            const Result = await SampleService.Save(sample);
            return res.status(200).send(Result);
        } catch (ex) {
            return res.status(404).send({text: "ERROR"});
        }
    }

    public static async Update(req: express.Request, res: express.Response) {

        const sample = new Sample();
        sample.id = req.body.id;
        sample.text = req.body.text;
        sample.email = req.body.email;

        try {
            const Result = await SampleService.Save(sample);
            return Result ? res.status(200).send() : res.status(404).send({text: "NOT FOUND"});
        } catch (ex) {
            return res.status(404).send({text: "ERROR"});
        }

    }

    public static async Delete(req: express.Request, res: express.Response) {
        const id: number = req.body.id;

        try {
            await SampleService.RemoveById(id);
            return res.status(204).send();
        } catch (ex) {
            return res.status(404).send({text: "ERROR"});
        }
    }

}
