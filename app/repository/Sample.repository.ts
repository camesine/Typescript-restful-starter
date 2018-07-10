import {EntityRepository, Repository} from "typeorm";
import {Sample} from "../models/Sample.model";

@EntityRepository(Sample)
export class SampleRepository extends Repository<Sample> {

    public BulkCreate(Samples: Sample[]): Promise<any> {
        return this.manager.createQueryBuilder().insert().into(Sample).values(Samples).execute();
    }

    public async deleteById(id: number) {
        const itemToRemove: Sample = await this.findOne({id});
        return this.manager.remove(itemToRemove);
    }
}
