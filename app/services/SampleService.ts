import { ISampleAttribute, ISampleInstance, ISampleModel, Sample } from '../models/Sample'

export class SampleService {

    public Sample: ISampleModel

    constructor() {
        this.Sample = Sample
    }

    public create = (sample: ISampleAttribute) => {
        return this.Sample.create(sample)
    }

    public list = () => {
       return this.Sample.findAll()
    }

    public find = (id: number) => {
       return this.Sample.findById(id)
    }

    public update = (sample: ISampleAttribute) => {
        return this.Sample.update({
            text: sample.text,
        }, {
            where: {
                id: sample.id,
            },
        })
    }

    public delete = (sample: ISampleAttribute) => {
        return this.Sample.destroy({where: {id: sample.id}})
    }

}
