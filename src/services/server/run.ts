import { BaseArgument, BaseMessageLevels, BaseServerErrorCodes } from "@templates/v0"
import { PocketServerManager } from "./manager"
import { PocketErrorMessage } from "@components/common/error";

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
        new PocketErrorMessage<
            BaseServerErrorCodes.SERVICE_UNAVAILABLE,
            BaseMessageLevels.ERROR,
            Error
        >({
            code: BaseServerErrorCodes.SERVICE_UNAVAILABLE
        });
    }

    await server.start();

    return server
}

export {
    runServer
}