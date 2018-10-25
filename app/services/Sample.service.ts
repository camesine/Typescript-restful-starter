import { getCustomRepository, Repository } from "typeorm";
import { Sample } from "../models/Sample.model";
import { SampleRepository } from "../repository/Sample.repository";

export class SampleService {

    private repository: SampleRepository;

    constructor() {
        this.repository = getCustomRepository(SampleRepository);
    }

    public findByText(text: string): Promise<Sample[]> {
        return this.repository.findByText(text);
    }

    public bulkCreate(Samples: Sample[]): Promise<Sample[]> {
        return this.repository.bulkCreate(Samples);
    }

    public findOneById(id: number): Promise<Sample> {
        return this.repository.findOneById(id);
    }

    public find(): Promise<Sample[]> {
        return this.repository.find();
    }

    public remove(sample: Sample): Promise<Sample> {
        return this.repository.remove(sample);
    }

    public removeById(id: number): Promise<Sample> {
        return this.repository.removeById(id);
    }

    public save(sample: Sample): Promise<Sample> {
        return this.repository.save(sample);
    }

}
