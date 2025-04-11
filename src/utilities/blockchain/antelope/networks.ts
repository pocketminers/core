class WAXChainNetworks {
  public static readonly MAINNET = 'mainnet';
  public static readonly TESTNET = 'testnet';
  public static readonly LOCALNET = 'localnet';
}

class WAXChainEndpoints {
    public static readonly MAINNET = [
        'https://wax.greymass.com',
        'https://wax.eosrio.io',
        'https://api.wax.alohaeos.com',
    ];

    public static readonly TESTNET = [
        'https://testnet.waxsweden.org',
        'https://waxtestnet.greymass.com',
        'https://testnet.wax.pink.gg',
    ];

    public static readonly LOCALNET = [
        'http://localhost:8888',
    ];
}

export {
    WAXChainNetworks,
    WAXChainEndpoints,
}