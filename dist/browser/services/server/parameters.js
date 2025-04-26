import { PocketParameter } from "@components/parameter";
var getPocketServerParameters = function () {
    var PocketServerParameters = new Array();
    PocketServerParameters.push(new PocketParameter({
        name: "Server Listen Port",
        key: "port",
        description: "The port the server will listen on.",
        default: 3000,
        required: true
    }));
};
export { getPocketServerParameters };
//# sourceMappingURL=parameters.js.map