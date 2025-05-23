import { PocketArgument } from "../../components/base/argument.js";
import { PocketParameter } from "../../components/base/parameter.js";
/**
 * The getLibp2pListenAddresses function returns an array of PocketParameter objects for configuring libp2p listen addresses.
 */
declare const getLibp2pListenAddressParameters: () => PocketParameter[];
declare const generateListenAddresses: (args?: PocketArgument[]) => {
    listen: Array<string>;
};
export { getLibp2pListenAddressParameters, generateListenAddresses };
//# sourceMappingURL=addresses.d.ts.map