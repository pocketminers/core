var WAXChainNetworks = /** @class */ (function () {
    function WAXChainNetworks() {
    }
    WAXChainNetworks.MAINNET = 'mainnet';
    WAXChainNetworks.TESTNET = 'testnet';
    WAXChainNetworks.LOCALNET = 'localnet';
    return WAXChainNetworks;
}());
var WAXChainEndpoints = /** @class */ (function () {
    function WAXChainEndpoints() {
    }
    WAXChainEndpoints.MAINNET = [
        'https://wax.greymass.com',
        'https://wax.eosrio.io',
        'https://api.wax.alohaeos.com',
    ];
    WAXChainEndpoints.TESTNET = [
        'https://testnet.waxsweden.org',
        'https://waxtestnet.greymass.com',
        'https://testnet.wax.pink.gg',
    ];
    WAXChainEndpoints.LOCALNET = [
        'http://localhost:8888',
    ];
    return WAXChainEndpoints;
}());
export { WAXChainNetworks, WAXChainEndpoints, };
//# sourceMappingURL=networks.js.map