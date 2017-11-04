"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SampleService_1 = require("../services/SampleService");
const SampleRepository_1 = require("../repository/SampleRepository");
const typeorm_1 = require("typeorm");
class SampleController {
    constructor() {
        this.Index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const SampleList = yield this.SampleRepository.find();
            res.send(SampleList);
        });
        this.Find = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const Sample = yield this.SampleRepository.findOneById(id);
            if (!Sample)
                res.status(404).send({ text: 'NOT FOUND' });
            res.status(200).send(Sample);
        });
        this.SampleService = new SampleService_1.SampleService();
        this.SampleRepository = typeorm_1.getCustomRepository(SampleRepository_1.SampleRepository);
    }
}
exports.SampleController = SampleController;
//# sourceMappingURL=SampleController.js.map