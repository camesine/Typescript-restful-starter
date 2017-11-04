"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JWT = require("jsonwebtoken");
const bearer = require("token-extractor");
const config_1 = require("../../config");
class JWTService {
    signToken(params, options) {
        return new Promise((resolve, reject) => {
            JWT.sign(params, config_1.config.SECRET, options || null, (err, token) => {
                if (err)
                    reject(err);
                resolve(token);
            });
        });
    }
    verifyToken(token, options) {
        return new Promise((resolve, reject) => {
            JWT.verify(token, config_1.config.SECRET, (err, decoded) => {
                if (err)
                    reject(err);
                resolve(decoded);
            });
        });
    }
    extractToken(req) {
        return new Promise((resolve, reject) => {
            bearer(req, (err, token) => {
                if (err)
                    return reject(err);
                resolve(token);
            });
        });
    }
}
exports.JWTService = JWTService;
//# sourceMappingURL=JWTService.js.map