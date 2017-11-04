"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = require("../config/db/Connection");
Connection_1.Connection.then(conn => {
    conn.migrations;
});
//# sourceMappingURL=migrate.js.map