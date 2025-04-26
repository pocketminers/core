import { PocketParameter } from "../../components/parameter.js";
var getPocketServerParameters = function () {
    var PocketServerParameters = new Array();
    PocketServerParameters.push(new PocketParameter({
        name: "Server Listen Port",
        key: "port",
        description: "The port the server will listen on.",
        default: 3000,
        required: true
    }));
    PocketServerParameters.push(new PocketParameter({
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
    }));
    PocketServerParameters.push(new PocketParameter({
        name: "Service Version",
        key: "version",
        description: "The version of the service to run.",
        default: "v0",
        required: true,
        options: [
            "v0"
        ]
    }));
    PocketServerParameters.push(new PocketParameter({
        name: "Service Name",
        key: "name",
        description: "The name of the service to run.",
        required: true
    }));
    PocketServerParameters.push(new PocketParameter({
        name: "Service Description",
        key: "description",
        description: "The description of the service to run.",
        required: false
    }));
    PocketServerParameters.push(new PocketParameter({
        name: "Node ID",
        key: "nodeId",
        description: "The ID of the node to run.",
        required: false
    }));
    return PocketServerParameters;
};
export { getPocketServerParameters };
//# sourceMappingURL=parameters.js.map