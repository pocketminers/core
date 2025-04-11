import { APIClient, APIClientOptions } from "@wharfkit/antelope"
import { ChainDefinitionType } from "@wharfkit/session"
import { WAXAccountInfo, WAXBlockInfo, WAXChainInfo } from "./eos.types";


/**
 * EOS Blockchain Utility
 * - Utilizes EOS tools from Antelope
 */
class EOS {

    /**
     * Chain definition for EOS based chains
     * @external https://validate.eosnation.io/wax/reports/endpoints.html
     */
    public static Chain(
        chainName: string
    ): ChainDefinitionType {

        switch (chainName) {
            case 'WAX':
                return {
                    id: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
                    url: 'https://wax.greymass.com'
                }
            default:
                return EOS.Chain('WAX');
        }
    }

    /**
     * Create an API client
     * @external https://docs.eosnetwork.com/apis/spring/latest/chain.api
     */
    public static ApiClient(options?: APIClientOptions): APIClient {
        return new APIClient({url: EOS.Chain('WAX').url, ...options});
    }

    /**
     * Get the chain info
     * @external https://docs.eosnetwork.com/apis/spring/latest/chain.api#operation/get_info
     */
    public static async getChainInfo(): Promise<WAXChainInfo> {
        return await EOS.ApiClient().call({
            method: 'POST',
            path: '/v1/chain/get_info'
        });
    }

    public static async getBlock(blockNum: string): Promise<WAXBlockInfo> {
        return await EOS.ApiClient().call({
            method: 'POST',
            path: '/v1/chain/get_block',
            params: {block_num_or_id: blockNum}
        });
    }

    public static async getBlockInfo(blockNum: string): Promise<any> {
        return await EOS.ApiClient().call({
            method: 'POST',
            path: '/v1/chain/get_block_info',
            params: {block_num: blockNum}
        });
    }


    /**
     * Get an account from an account name
     * @external https://docs.eosnetwork.com/apis/spring/latest/chain.api#operation/get_account
     */
    public static async getAccountFromAccountName({
        accountName
    }: {
        accountName: string
    }): Promise<WAXAccountInfo> {
        const account: any = await EOS.ApiClient().call({
            method: 'POST',
            path: '/v1/chain/get_account',
            params: {account_name: accountName}
        });

        return account;
    }

    /**
     * Get the balance of an account
     * @external https://docs.eosnetwork.com/apis/spring/latest/chain.api#operation/get_currency_balance
     */
    public static async getBalanceFromAccountName({
        accountName,
        token,
        contract
    }: {
        accountName: string,
        token: string,
        contract: string
    }): Promise<string> {
        const account: any = await EOS.getAccountFromAccountName({accountName});

        return await EOS.ApiClient().call({
            method: 'POST',
            path: '/v1/chain/get_currency_balance',
            params: {code: contract, account: accountName, symbol: token}
        });
    }
    
}


export {
    EOS
}