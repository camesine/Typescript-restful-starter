import { EntityRepository, Repository, getManager, AbstractRepository, EntityManager, getCustomRepository } from 'typeorm'
import { Sample } from '../entity/Sample'

@EntityRepository(Sample)
export class SampleRepository extends Repository<Sample> {

    public FindByText(_Sample: Sample): Promise<Sample[]> {
        return this.find(_Sample)
    }

    public BukCreate(_Samples : Sample[]): Promise<any> {
        return this.manager.createQueryBuilder().insert().into(Sample).values(_Samples).execute()
    }

}
