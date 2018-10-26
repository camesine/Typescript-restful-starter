import * as express from "express";
import { Sample } from "../models/Sample.model";
import { SampleService } from "../services/Sample.service";
import { Controller } from "./Controller";

export class SampleController extends Controller {

    private sampleService: SampleService;

    constructor(req: express.Request, res: express.Response) {
        super(req, res);
        this.sampleService = new SampleService();
    }

    public async all(): Promise<express.Response> {
        const sampleList = await this.sampleService.find();
        return this.res.send(sampleList);
    }

    public async find(): Promise<express.Response> {
        const { id } = this.req.params;
        const sample = await this.sampleService.findOneById(id);
        return sample ? this.res.status(200).send(sample) : this.res.status(404).send({ text: "NOT FOUND" });
    }

    public async create(): Promise<express.Response> {
        const { text } = this.req.body;
        const sample = new Sample();
        sample.text = text;
        sample.email = "someone@somewhere.com";
        try {
            const result = await this.sampleService.save(sample);
            return this.res.status(200).send(result);
        } catch (ex) {
            return this.res.status(404).send({ text: "ERROR" });
        }
    }

    public async update(): Promise<express.Response> {
        const sample = new Sample();
        const { id, text, email } = this.req.body;
        sample.id = id;
        sample.text = text;
        sample.email = email;
        try {
            const result = await this.sampleService.save(sample);
            return result ? this.res.status(200).send() : this.res.status(404).send({ text: "NOT FOUND" });
        } catch (ex) {
            return this.res.status(404).send({text: "ERROR"});
        }
    }

    public async delete(): Promise<express.Response> {
        const { id } = this.req.body;
        try {
            await this.sampleService.removeById(id);
            return this.res.status(204).send();
        } catch (ex) {
            return this.res.status(404).send({text: "ERROR"});
        }
    }

}
