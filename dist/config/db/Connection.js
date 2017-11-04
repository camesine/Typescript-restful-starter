"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const typeorm_1 = require("typeorm");
const Sample_1 = require("../../app/entity/Sample");
const SERVER = process.env.SERVER || config_1.config.DATABASE.SERVER || 'localhost';
const DATABASE = process.env.DB || config_1.config.DATABASE.DB || "test";
const USER = process.env.USER || config_1.config.DATABASE.USER || 'root';
const PASSWORD = process.env.PASSWORD || config_1.config.DATABASE.PASSWORD || '';
const DIALECT = process.env.DIALECT || config_1.config.DATABASE.DIALECT || 'mysql';
exports.Connection = typeorm_1.createConnection({
    type: DIALECT,
    host: SERVER,
    port: 3306,
    username: USER,
    password: PASSWORD,
    database: DATABASE,
    entities: [
        Sample_1.Sample
    ],
    synchronize: false,
    logging: false
});
//# sourceMappingURL=Connection.js.map