import * as express from 'express'
import { SampleService } from '../services/SampleService'
import { SampleRepository } from '../repository/SampleRepository'
import { Sample } from '../entity/Sample'
import { getCustomRepository } from 'typeorm'

export class SampleController {

    private SampleService: SampleService
    private SampleRepository: SampleRepository

    constructor() {

        this.SampleService = new SampleService()
        this.SampleRepository = getCustomRepository(SampleRepository)
    
    }

    public Index = async (req: express.Request, res: express.Response) => {
        const SampleList = await this.SampleRepository.find()
        res.send(SampleList)
    }

    public Find = async (req: express.Request, res: express.Response) => {

        const id: number = req.params.id
        const Sample = await this.SampleRepository.findOneById(id)
        Sample ? res.status(200).send(Sample) : res.status(404).send({ text: 'NOT FOUND' })

    }

    public Create = async (req: express.Request, res: express.Response) => {

        const text: string = req.body.text
        if(!text) res.status(404).send({ text: 'ERROR' }).end(true)
        const sample = new Sample()
        sample.text = text
        const result = await this.SampleRepository.save(sample).catch(err => res.status(404).send({ text: 'ERROR' }))
        res.status(200).send(result)

    }

    public Update = async (req: express.Request, res: express.Response) => {

        if(!req.body.id || !req.body.text) res.status(404).send({ text: 'ERROR' }).end(true)
        const sample = new Sample()
        sample.id = req.body.id
        sample.text = req.body.id
        const result = await this.SampleRepository.save(sample).catch(err => res.status(404).send({ text: 'ERROR' }))
        result ? res.status(200).send() : res.status(404).send({ text: 'NOT FOUND' })

    }

    public delete = async (req: express.Request, res: express.Response) => {

        const id: number = req.body.id
        if(!id) res.status(404).send({ text: 'ERROR' }).end(true)
        await this.SampleRepository.removeById(id).catch(err => res.status(404).send({ text: 'ERROR' }))
        res.status(204).send()
    
    }

}
