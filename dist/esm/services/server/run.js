import { BaseServerErrorCodes } from "../../templates/v0/index.js";
import { PocketServerManager } from "./manager.js";
import { PocketErrorMessage } from "../../components/common/error.js";
const runServer = async ({ manager = undefined, args = [] } = {}) => {
    const server = new PocketServerManager({
        arguments_: args
    });
    if (server === undefined) {
        new PocketErrorMessage({
            code: BaseServerErrorCodes.SERVICE_UNAVAILABLE
        });
    }
    await server.start();
    return server;
};
export { runServer };
//# sourceMappingURL=run.js.map