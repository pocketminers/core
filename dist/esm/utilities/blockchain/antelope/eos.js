import { APIClient } from "@wharfkit/antelope";
/**
 * EOS Blockchain Utility
 * - Utilizes EOS tools from Antelope
 */
class EOS {
    /**
     * Chain definition for EOS based chains
     * @external https://validate.eosnation.io/wax/reports/endpoints.html
     */
    static Chain(chainName) {
        switch (chainName) {
            case 'WAX':
                return {
                    id: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
                    url: 'https://wax.greymass.com'
                };
            default:
                return EOS.Chain('WAX');
        }
    }
    /**
     * Create an API client
     * @external https://docs.eosnetwork.com/apis/spring/latest/chain.api
     */
    static ApiClient(options) {
        return new APIClient({ url: EOS.Chain('WAX').url, ...options });
    }
    /**
     * Get the chain info
     * @external https://docs.eosnetwork.com/apis/spring/latest/chain.api#operation/get_info
     */
    static async getChainInfo() {
        return await EOS.ApiClient().call({
            method: 'POST',
            path: '/v1/chain/get_info'
        });
    }
    static async getBlock(blockNum) {
        return await EOS.ApiClient().call({
            method: 'POST',
            path: '/v1/chain/get_block',
            params: { block_num_or_id: blockNum }
        });
    }
    static async getBlockInfo(blockNum) {
        return await EOS.ApiClient().call({
            method: 'POST',
            path: '/v1/chain/get_block_info',
            params: { block_num: blockNum }
        });
    }
    /**
     * Get an account from an account name
     * @external https://docs.eosnetwork.com/apis/spring/latest/chain.api#operation/get_account
     */
    static async getAccountFromAccountName({ accountName }) {
        const account = await EOS.ApiClient().call({
            method: 'POST',
            path: '/v1/chain/get_account',
            params: { account_name: accountName }
        });
        return account;
    }
    /**
     * Get the balance of an account
     * @external https://docs.eosnetwork.com/apis/spring/latest/chain.api#operation/get_currency_balance
     */
    static async getBalanceFromAccountName({ accountName, token, contract }) {
        const account = await EOS.getAccountFromAccountName({ accountName });
        return await EOS.ApiClient().call({
            method: 'POST',
            path: '/v1/chain/get_currency_balance',
            params: { code: contract, account: accountName, symbol: token }
        });
    }
}
export { EOS };
//# sourceMappingURL=eos.js.map