import { EntityRepository, Repository } from 'typeorm'
import { Sample } from '../entity/Sample'

@EntityRepository(Sample)
export class SampleRepository extends Repository<Sample> {

    public BukCreate(_Samples : Sample[]): Promise<any> {
        return this.manager.createQueryBuilder().insert().into(Sample).values(_Samples).execute()
    }

}
