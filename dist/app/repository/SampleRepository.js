"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Sample_1 = require("../entity/Sample");
let SampleRepository = class SampleRepository extends typeorm_1.Repository {
    FindByText(_Sample) {
        return this.find(_Sample);
    }
    BukCreate(_Samples) {
        return this.manager.createQueryBuilder().insert().into(Sample_1.Sample).values(_Samples).execute();
    }
};
SampleRepository = __decorate([
    typeorm_1.EntityRepository(Sample_1.Sample)
], SampleRepository);
exports.SampleRepository = SampleRepository;
//# sourceMappingURL=SampleRepository.js.map