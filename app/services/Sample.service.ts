import { getCustomRepository } from "typeorm";
import { Sample } from "../models/Sample.model";
import { SampleRepository } from "../repository/Sample.repository";

export class SampleService {
    public static findByText(text: string): Promise<Sample[]> {
        return getCustomRepository(SampleRepository).findByText(text);
    }

    public static bulkCreate(Samples: Sample[]): Promise<Sample[]> {
        return getCustomRepository(SampleRepository).bulkCreate(Samples);
    }

    public static findOneById(id: number): Promise<Sample> {
        return getCustomRepository(SampleRepository).findOneById(id);
    }

    public static find(): Promise<Sample[]> {
        return getCustomRepository(SampleRepository).find();
    }

    public static remove(sample: Sample): Promise<Sample> {
        return getCustomRepository(SampleRepository).remove(sample);
    }

    public static removeById(id: number): Promise<Sample> {
        return getCustomRepository(SampleRepository).removeById(id);
    }

    public static save(sample: Sample): Promise<Sample> {
        return getCustomRepository(SampleRepository).save(sample);
    }
}
