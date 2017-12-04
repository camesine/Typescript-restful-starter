import { Sample } from '../entity/Sample'
import { SampleRepository } from '../repository/SampleRepository'
import { getCustomRepository } from 'typeorm'

export class SampleService {

    private SampleRepository: SampleRepository

    constructor() {
        this.SampleRepository = getCustomRepository(SampleRepository)
    }

    public FindByText = (sample: Sample): Promise<Sample[]> => {
        return Sample.FindByText(sample)
    }

    public BulkCreate = (Samples: Sample[]): Promise<Sample[]> => {
        return this.SampleRepository.BukCreate(Samples)
    }

}
