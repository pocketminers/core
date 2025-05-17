"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPocketServerParameters = void 0;
const parameter_1 = require("../../components/base/parameter.js");
const getPocketServerParameters = () => {
    const PocketServerParameters = new Array();
    PocketServerParameters.push(new parameter_1.PocketParameter({
        name: "Server Listen Port",
        key: "port",
        description: "The port the server will listen on.",
        default: 3000,
        required: true
    }), new parameter_1.PocketParameter({
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
    }), new parameter_1.PocketParameter({
        name: "Service Version",
        key: "version",
        description: "The version of the service to run.",
        default: "v0",
        required: true,
        options: [
            "v0"
        ]
    }), new parameter_1.PocketParameter({
        name: "Service Name",
        key: "name",
        description: "The name of the service to run.",
        required: true
    }), new parameter_1.PocketParameter({
        name: "Service Description",
        key: "description",
        description: "The description of the service to run.",
        required: false
    }), new parameter_1.PocketParameter({
        name: "Node ID",
        key: "nodeId",
        description: "The ID of the node to run.",
        required: false
    }));
    return PocketServerParameters;
};
exports.getPocketServerParameters = getPocketServerParameters;
//# sourceMappingURL=parameters.js.map