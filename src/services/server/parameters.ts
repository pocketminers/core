import { PocketParameter } from "@components/base/parameter";
import { BaseParameter, BaseParameters } from "@templates/v0";


const getPocketServerParameters = (): PocketParameter[] => {

    const PocketServerParameters: PocketParameter[] = new Array<PocketParameter>();

    PocketServerParameters.push(
        new PocketParameter<number>({
            name: "Server Listen Port",
            key: "port",
            description: "The port the server will listen on.",
            default: 3000,
            required: true
        }),
        new PocketParameter<string>({
            name: "Service Type",
            key: "type",
            description: "The type of service to run.",
            default: "api",
            required: true,
            options: [
                "api",
                "rpc",
                "websocket"
            ]
        }),
        new PocketParameter<string>({
            name: "Service Version",
            key: "version",
            description: "The version of the service to run.",
            default: "v0",
            required: true,
            options: [
                "v0"
            ]
        }),
        new PocketParameter<string>({
            name: "Service Name",
            key: "name",
            description: "The name of the service to run.",
            required: true
        }),
        new PocketParameter<string>({
            name: "Service Description",
            key: "description",
            description: "The description of the service to run.",
            required: false
        }),
        new PocketParameter<string>({
            name: "Node ID",
            key: "nodeId",
            description: "The ID of the node to run.",
            required: false
        })
    );

    return PocketServerParameters;
}


export {
    getPocketServerParameters
};