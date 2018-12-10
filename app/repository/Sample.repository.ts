import { EntityRepository, Repository } from "typeorm";
import { Sample } from "../models";

@EntityRepository(Sample)
export class SampleRepository extends Repository<Sample> {

    public bulkCreate(Samples: Sample[]): Promise<any> {
        return this.manager.createQueryBuilder().insert().into(Sample).values(Samples).execute();
    }

    public async removeById(id: number): Promise<Sample> {
        const itemToRemove: Sample = await this.findOne({id});
        return this.manager.remove(itemToRemove);
    }

    public findByText(text: string): Promise<Sample[]> {
        return this.manager.find(Sample, {where: {text}});
    }

    public findOneById(id: number): Promise<Sample> {
        return this.manager.findOne(Sample, {where: {id}});
    }

}
