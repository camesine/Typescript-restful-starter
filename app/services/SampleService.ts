import { Sample } from '../entity/Sample'
import { SampleRepository } from '../repository/SampleRepository'
import { getCustomRepository } from 'typeorm'

export class SampleService {

    private SampleRepository: SampleRepository
    
    constructor() {
        this.SampleRepository = getCustomRepository(SampleRepository)
    }

    public FindByText = (_Sample : Sample) : Promise<Sample[]> => {
        return this.SampleRepository.find(_Sample)
    }

    public BulkCreate = (_Samples : Sample[]) : Promise<Sample[]> => {
        return this.SampleRepository.BukCreate(_Samples)
    }

}
