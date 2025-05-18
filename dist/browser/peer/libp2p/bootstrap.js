import { multiaddr } from '@multiformats/multiaddr';
import { bootstrap } from '@libp2p/bootstrap';
import { PocketParameter } from '../../components/base/index.js';
import { PocketConfiguration } from '../../components/common/index.js';
var getLibp2pBootstrapParameters = function () {
    var parameters = [
        new PocketParameter({
            name: 'Default Config',
            key: 'defaultConfig',
            description: 'Use default bootstrap configuration',
            default: true,
            required: false
        }),
        new PocketParameter({
            name: 'Multiaddrs',
            key: 'multiaddrs',
            description: 'Custom bootstrap configuration',
            default: [],
            required: false,
        }),
        new PocketParameter({
            name: 'List',
            key: 'list',
            description: 'List bootstrap configuration, instead of returning a function',
            default: false,
            required: false,
        })
    ];
    return parameters;
};
/**
 * Default bootstrap configuration for libp2p
 * @category Libp2p
 */
var defaultBootstrapConfig = [
    "/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN",
    "/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa",
    "/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb",
    "/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt",
    "/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ"
];
var libp2pBootstrap = function (args) {
    var libp2pBoiotstrapConfig = new PocketConfiguration({
        args: args,
        params: getLibp2pBootstrapParameters()
    });
    var addrs = new Array();
    var _a = libp2pBoiotstrapConfig.preparedArgs({ allowNonRequired: true }), defaultConfig = _a.defaultConfig, multiaddrs = _a.multiaddrs, list = _a.list;
    if (defaultConfig === true) {
        defaultBootstrapConfig.forEach(function (addr) {
            addrs.push(addr);
        });
    }
    if (multiaddrs ? (multiaddrs === null || multiaddrs === void 0 ? void 0 : multiaddrs.length) > 0 : false) {
        multiaddrs === null || multiaddrs === void 0 ? void 0 : multiaddrs.forEach(function (addr) {
            if (typeof addr === 'string') {
                addrs.push(addr);
            }
            else {
                addrs.push(multiaddr(addr).toString());
            }
        });
    }
    if (list === true) {
        return addrs;
    }
    return bootstrap({ list: addrs });
};
export { libp2pBootstrap, getLibp2pBootstrapParameters };
//# sourceMappingURL=bootstrap.js.map