import { getCustomRepository } from "typeorm";
import { Sample } from "../models";
import { SampleRepository } from "../repository";

export class SampleService {

    public findByText(text: string): Promise<Sample[]> {
        return getCustomRepository(SampleRepository).findByText(text);
    }

    public bulkCreate(Samples: Sample[]): Promise<Sample[]> {
        return getCustomRepository(SampleRepository).bulkCreate(Samples);
    }

    public findOneById(id: number): Promise<Sample> {
        return getCustomRepository(SampleRepository).findOneById(id);
    }

    public find(): Promise<Sample[]> {
        return getCustomRepository(SampleRepository).find();
    }

    public remove(sample: Sample): Promise<Sample> {
        return getCustomRepository(SampleRepository).remove(sample);
    }

    public removeById(id: number): Promise<Sample> {
        return getCustomRepository(SampleRepository).removeById(id);
    }

    public save(sample: Sample): Promise<Sample> {
        return getCustomRepository(SampleRepository).save(sample);
    }

}
