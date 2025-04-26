import { PocketParameter } from "@components/parameter";
import { BaseParameters } from "@templates/v0";


const getPocketServerParameters = () => {

    const PocketServerParameters: BaseParameters = new Array<PocketParameter>();

    PocketServerParameters.push(
        new PocketParameter<number>({
            name: "Server Listen Port",
            key: "port",
            description: "The port the server will listen on.",
            default: 3000,
            required: true
        })
    );
}


export {
    getPocketServerParameters
};