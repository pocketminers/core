import { BaseMessageLevels, BaseServerErrorCodes } from "../../templates/v0/index.js";
import { PocketServerManager } from "./manager.js";
import { PocketErrorMessage } from "../../components/error.js";
const runServer = async ({ manager = undefined, args = [] } = {}) => {
    const server = new PocketServerManager({
        arguments_: args
    });
    if (server === undefined) {
        throw new PocketErrorMessage({
            error: new Error('Server is undefined'),
            code: BaseServerErrorCodes.SERVICE_UNAVAILABLE,
            level: BaseMessageLevels.ERROR,
            callback: async (message) => {
                console.error('Server is undefined', message);
            },
            throwError: true
        });
    }
    await server.start();
    return server;
};
export { runServer };
//# sourceMappingURL=run.js.map