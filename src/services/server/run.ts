import { BaseArgument, BaseMessageLevels, BaseServerErrorCodes } from "@templates/v0"
import { PocketServerManager } from "./manager"
import { PocketErrorMessage } from "@components/error";

const runServer = async ({
    manager = undefined,
    args = []
}: {
    manager?: PocketServerManager,
    args?: BaseArgument[]
} = {}): Promise<PocketServerManager> => {
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

    return server
}

export {
    runServer
}