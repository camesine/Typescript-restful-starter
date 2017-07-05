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
        if(!sample.text) res.status(404).send({ text: 'ERROR' }).end(true)
        const result = await this.SampleService.create(sample).catch(err => res.status(404).send({ text: 'ERROR' }))
        res.status(200).send(result)
    }

    public find = async (req: express.Request, res: express.Response) => {
        const id: number = req.params.id
        const result = await this.SampleService.find(id).catch(err => res.status(404).send({ text: 'ERROR' }))
        if(!result) res.status(404).send({ text: 'NOT FOUND' })
        res.status(200).send(result)
    }

    public update = async (req: express.Request, res: express.Response) => {
        const sample: ISampleAttribute = req.body.sample
        if(!sample.id || !sample.text) res.status(404).send({ text: 'ERROR' }).end(true)
        const result = await this.SampleService.update(sample).catch(err => res.status(404).send({ text: 'ERROR' }))
        if(!result) res.status(404).send({ text: 'NOT FOUND' })
        res.status(200).send(result)
    }

    public delete = async (req: express.Request, res: express.Response) => {
        const sample = req.body.sample
        if(!sample.id) res.status(404).send({ text: 'ERROR' }).end(true)
        const result = await this.SampleService.delete(sample).catch(err => res.status(404).send({ text: 'ERROR' }))
        if(!result) res.status(404).send({ text: 'NOT FOUND' })
        res.sendStatus(204)
    }

}
