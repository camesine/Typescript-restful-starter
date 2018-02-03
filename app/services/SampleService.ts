import { getCustomRepository } from "typeorm";
import { Sample } from "../entity/Sample";
import { SampleRepository } from "../repository/SampleRepository";

export class SampleService {

  private SampleRepository: SampleRepository;

  constructor() {
    this.SampleRepository = getCustomRepository(SampleRepository);
  }

  public FindByText = (text: string): Promise<Sample[]> => {
    return Sample.FindByText(text);
  }

  public BulkCreate = (Samples: Sample[]): Promise<Sample[]> => {
    return this.SampleRepository.BukCreate(Samples);
  }

}
