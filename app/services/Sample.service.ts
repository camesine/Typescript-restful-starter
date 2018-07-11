import { getCustomRepository } from "typeorm";
import { Sample } from "../models/Sample.model";
import { SampleRepository } from "../repository/Sample.repository";

export class SampleService {
    public static FindByText(text: string): Promise<Sample[]> {
        return getCustomRepository(SampleRepository).findByText(text);
    }

    public static BulkCreate(Samples: Sample[]): Promise<Sample[]> {
        return getCustomRepository(SampleRepository).bulkCreate(Samples);
    }

    public static FindOneById(id: number) {
        return getCustomRepository(SampleRepository).findOneById(id);
    }

    public static Find() {
        return getCustomRepository(SampleRepository).find();
    }

    public static Remove(sample: Sample) {
        return getCustomRepository(SampleRepository).remove(sample);
    }

    public static RemoveById(id: number) {
        return getCustomRepository(SampleRepository).removeById(id);
    }

    public static Save(sample: Sample) {
        return getCustomRepository(SampleRepository).save(sample);
    }
}
