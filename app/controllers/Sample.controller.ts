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
        const id: number = this.req.params.id;
        const sample = await this.sampleService.findOneById(id);
        return sample ? this.res.status(200).send(sample) : this.res.status(404).send({ text: "NOT FOUND" });
    }

    public async create(): Promise<express.Response> {
        const text: string = this.req.body.text;
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
        sample.id = this.req.body.id;
        sample.text = this.req.body.text;
        sample.email = this.req.body.email;
        try {
            const result = await this.sampleService.save(sample);
            return result ? this.res.status(200).send() : this.res.status(404).send({ text: "NOT FOUND" });
        } catch (ex) {
            return this.res.status(404).send({text: "ERROR"});
        }
    }

    public async delete(): Promise<express.Response> {
        const id: number = this.req.body.id;
        try {
            await this.sampleService.removeById(id);
            return this.res.status(204).send();
        } catch (ex) {
            return this.res.status(404).send({text: "ERROR"});
        }
    }

}
