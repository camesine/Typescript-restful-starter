import * as express from "express";
import { Sample } from "../models/Sample.model";
import { SampleService } from "../services/Sample.service";

export class SampleController {

    public static async all(req: express.Request, res: express.Response) {
        const sampleList = await SampleService.find();
        return res.send(sampleList);
    }

    public static async find(req: express.Request, res: express.Response) {
        const id: number = req.params.id;
        const sample = await SampleService.findOneById(id);
        return sample ? res.status(200).send(sample) : res.status(404).send({ text: "NOT FOUND" });
    }

    public static async create(req: express.Request, res: express.Response) {
        const text: string = req.body.text;
        const sample = new Sample();
        sample.text = text;
        sample.email = "someone@somewhere.com";
        try {
            const result = await SampleService.save(sample);
            return res.status(200).send(result);
        } catch (ex) {
            return res.status(404).send({ text: "ERROR" });
        }
    }

    public static async update(req: express.Request, res: express.Response) {
        const sample = new Sample();
        sample.id = req.body.id;
        sample.text = req.body.text;
        sample.email = req.body.email;
        try {
            const result = await SampleService.save(sample);
            return result ? res.status(200).send() : res.status(404).send({ text: "NOT FOUND" });
        } catch (ex) {
            return res.status(404).send({text: "ERROR"});
        }
    }

    public static async delete(req: express.Request, res: express.Response) {
        const id: number = req.body.id;
        try {
            await SampleService.removeById(id);
            return res.status(204).send();
        } catch (ex) {
            return res.status(404).send({text: "ERROR"});
        }
    }

}
