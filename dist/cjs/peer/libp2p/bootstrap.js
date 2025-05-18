"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLibp2pBootstrapParameters = exports.libp2pBootstrap = void 0;
const multiaddr_1 = require("@multiformats/multiaddr");
const bootstrap_1 = require("@libp2p/bootstrap");
const base_1 = require("../../components/base/index.js");
const common_1 = require("../../components/common/index.js");
const getLibp2pBootstrapParameters = () => {
    const parameters = [
        new base_1.PocketParameter({
            name: 'Default Config',
            key: 'defaultConfig',
            description: 'Use default bootstrap configuration',
            default: true,
            required: false
        }),
        new base_1.PocketParameter({
            name: 'Multiaddrs',
            key: 'multiaddrs',
            description: 'Custom bootstrap configuration',
            default: [],
            required: false,
        }),
        new base_1.PocketParameter({
            name: 'List',
            key: 'list',
            description: 'List bootstrap configuration, instead of returning a function',
            default: false,
            required: false,
        })
    ];
    return parameters;
};
exports.getLibp2pBootstrapParameters = getLibp2pBootstrapParameters;
/**
 * Default bootstrap configuration for libp2p
 * @category Libp2p
 */
const defaultBootstrapConfig = [
    "/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN",
    "/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa",
    "/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb",
    "/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt",
    "/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ"
];
const libp2pBootstrap = (args) => {
    const libp2pBoiotstrapConfig = new common_1.PocketConfiguration({
        args,
        params: getLibp2pBootstrapParameters()
    });
    const addrs = new Array();
    const { defaultConfig, multiaddrs, list } = libp2pBoiotstrapConfig.preparedArgs({ allowNonRequired: true });
    if (defaultConfig === true) {
        defaultBootstrapConfig.forEach((addr) => {
            addrs.push(addr);
        });
    }
    if (multiaddrs ? multiaddrs?.length > 0 : false) {
        multiaddrs?.forEach((addr) => {
            if (typeof addr === 'string') {
                addrs.push(addr);
            }
            else {
                addrs.push((0, multiaddr_1.multiaddr)(addr).toString());
            }
        });
    }
    if (list === true) {
        return addrs;
    }
    return (0, bootstrap_1.bootstrap)({ list: addrs });
};
exports.libp2pBootstrap = libp2pBootstrap;
//# sourceMappingURL=bootstrap.js.map