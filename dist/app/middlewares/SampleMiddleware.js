"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SampleMiddleware {
    anyCheck(req, res, next) {
        const value = "this";
        const value2 = "this";
        if (value === value2) {
            next();
        }
        else {
            res.json({ error: 'error anyCheck' });
        }
    }
    anyCheckTwo(req, res, next) {
        const value = "this";
        const value2 = "this";
        if (value === value2) {
            next();
        }
        else {
            res.json({ error: 'error anyCheck' });
        }
    }
}
exports.SampleMiddleware = SampleMiddleware;
//# sourceMappingURL=SampleMiddleware.js.map