import { PocketParameter } from "../../components/parameter.js";
const getPocketServerParameters = () => {
    const PocketServerParameters = new Array();
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