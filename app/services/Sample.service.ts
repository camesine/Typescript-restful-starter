import { getCustomRepository } from "typeorm";
import { Sample } from "../models/Sample.model";
import { SampleRepository } from "../repository/Sample.repository";

export class SampleService {

  private SampleRepository: SampleRepository;

  constructor() {
    this.SampleRepository = getCustomRepository(SampleRepository);
  }

  public FindByText(text: string): Promise<Sample[]> {
    return Sample.FindByText(text);
  }

  public BulkCreate(Samples: Sample[]): Promise<Sample[]> {
    return this.SampleRepository.BulkCreate(Samples);
  }
}
