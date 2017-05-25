import * as express from 'express'
import { ISampleAttribute } from '../models/Sample'
import { SampleService } from '../services/SampleService'

export class SampleController {

    private SampleService: SampleService

    constructor() {
        this.SampleService = new SampleService()
    }

    public index = async (req: express.Request, res: express.Response) => {
        const result = await this.SampleService.list()
        res.send(result)
    }

    public create = async (req: express.Request, res: express.Response) => {
        const sample: ISampleAttribute = req.body.sample
        console.log(sample)
        const result = await this.SampleService.create(sample)
        res.status(200).send(result)
    }

    public find = async (req: express.Request, res: express.Response) => {
        const id: number = req.params.id
        const result = await this.SampleService.find(id)
        res.status(200).send(result)
    }

    public update = async (req: express.Request, res: express.Response) => {
        const sample: ISampleAttribute = req.body.sample
        const result = await this.SampleService.update(sample)
        res.status(200).send(result)
    }

    public delete = async (req: express.Request, res: express.Response) => {
        const sample = req.body.sample
        const result = await this.SampleService.delete(sample)
        res.sendStatus(204)
    }

}
