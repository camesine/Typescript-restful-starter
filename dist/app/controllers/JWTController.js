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
const JWTService_1 = require("../services/JWTService");
class JWTController {
    constructor() {
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const payload = req.body.payload;
            const token = yield this.Service.signToken(payload);
            res.send(token);
        });
        this.Service = new JWTService_1.JWTService();
    }
}
exports.JWTController = JWTController;
//# sourceMappingURL=JWTController.js.map