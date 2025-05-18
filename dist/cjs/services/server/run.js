"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runServer = void 0;
const v0_1 = require("../../templates/v0/index.js");
const manager_1 = require("./manager.js");
const error_1 = require("../../components/common/error.js");
const runServer = async ({ manager = undefined, args = [] } = {}) => {
    const server = new manager_1.PocketServerManager({
        arguments_: args
    });
    if (server === undefined) {
        new error_1.PocketErrorMessage({
            code: v0_1.BaseServerErrorCodes.SERVICE_UNAVAILABLE
        });
    }
    await server.start();
    return server;
};
exports.runServer = runServer;
//# sourceMappingURL=run.js.map