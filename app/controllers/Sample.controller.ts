import * as express from "express";
import { Sample } from "../models/Sample.model";
import { SampleService } from "../services/Sample.service";

export class SampleController {

    private sampleService: SampleService;

    constructor() {
        this.sampleService = new SampleService();
    }

    public async all(req: express.Request, res: express.Response) {
        const sampleList = await this.sampleService.find();
        return res.send(sampleList);
    }

    public async find(req: express.Request, res: express.Response) {
        const id: number = req.params.id;
        const sample = await this.sampleService.findOneById(id);
        return sample ? res.status(200).send(sample) : res.status(404).send({ text: "NOT FOUND" });
    }

    public async create(req: express.Request, res: express.Response) {
        const text: string = req.body.text;
        const sample = new Sample();
        sample.text = text;
        sample.email = "someone@somewhere.com";
        try {
            const result = await this.sampleService.save(sample);
            return res.status(200).send(result);
        } catch (ex) {
            return res.status(404).send({ text: "ERROR" });
        }
    }

    public async update(req: express.Request, res: express.Response) {
        const sample = new Sample();
        sample.id = req.body.id;
        sample.text = req.body.text;
        sample.email = req.body.email;
        try {
            const result = await this.sampleService.save(sample);
            return result ? res.status(200).send() : res.status(404).send({ text: "NOT FOUND" });
        } catch (ex) {
            return res.status(404).send({text: "ERROR"});
        }
    }

    public async delete(req: express.Request, res: express.Response) {
        const id: number = req.body.id;
        try {
            await this.sampleService.removeById(id);
            return res.status(204).send();
        } catch (ex) {
            return res.status(404).send({text: "ERROR"});
        }
    }

}
