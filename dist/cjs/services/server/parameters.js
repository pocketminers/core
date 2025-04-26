"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPocketServerParameters = void 0;
const parameter_1 = require("../../components/parameter.js");
const getPocketServerParameters = () => {
    const PocketServerParameters = new Array();
    PocketServerParameters.push(new parameter_1.PocketParameter({
        name: "Server Listen Port",
        key: "port",
        description: "The port the server will listen on.",
        default: 3000,
        required: true
    }));
};
exports.getPocketServerParameters = getPocketServerParameters;
//# sourceMappingURL=parameters.js.map