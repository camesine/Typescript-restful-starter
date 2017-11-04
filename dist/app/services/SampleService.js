"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SampleRepository_1 = require("../repository/SampleRepository");
const typeorm_1 = require("typeorm");
class SampleService {
    constructor() {
        this.FindByText = (_Sample) => {
            return this.SampleRepository.find(_Sample);
        };
        this.BulkCreate = (_Samples) => {
            return this.SampleRepository.BukCreate(_Samples);
        };
        this.SampleRepository = typeorm_1.getCustomRepository(SampleRepository_1.SampleRepository);
    }
}
exports.SampleService = SampleService;
//# sourceMappingURL=SampleService.js.map