"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WAXChainEndpoints = exports.WAXChainNetworks = void 0;
class WAXChainNetworks {
    static MAINNET = 'mainnet';
    static TESTNET = 'testnet';
    static LOCALNET = 'localnet';
}
exports.WAXChainNetworks = WAXChainNetworks;
class WAXChainEndpoints {
    static MAINNET = [
        'https://wax.greymass.com',
        'https://wax.eosrio.io',
        'https://api.wax.alohaeos.com',
    ];
    static TESTNET = [
        'https://testnet.waxsweden.org',
        'https://waxtestnet.greymass.com',
        'https://testnet.wax.pink.gg',
    ];
    static LOCALNET = [
        'http://localhost:8888',
    ];
}
exports.WAXChainEndpoints = WAXChainEndpoints;
//# sourceMappingURL=networks.js.map