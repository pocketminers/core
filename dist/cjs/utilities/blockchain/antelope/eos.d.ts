import { APIClient, APIClientOptions } from "@wharfkit/antelope";
import { ChainDefinitionType } from "@wharfkit/session";
import { WAXAccountInfo, WAXBlockInfo, WAXChainInfo } from "./eos.types.js";
/**
 * EOS Blockchain Utility
 * - Utilizes EOS tools from Antelope
 */
declare class EOS {
    /**
     * Chain definition for EOS based chains
     * @external https://validate.eosnation.io/wax/reports/endpoints.html
     */
    static Chain(chainName: string): ChainDefinitionType;
    /**
     * Create an API client
     * @external https://docs.eosnetwork.com/apis/spring/latest/chain.api
     */
    static ApiClient(options?: APIClientOptions): APIClient;
    /**
     * Get the chain info
     * @external https://docs.eosnetwork.com/apis/spring/latest/chain.api#operation/get_info
     */
    static getChainInfo(): Promise<WAXChainInfo>;
    static getBlock(blockNum: string): Promise<WAXBlockInfo>;
    static getBlockInfo(blockNum: string): Promise<any>;
    /**
     * Get an account from an account name
     * @external https://docs.eosnetwork.com/apis/spring/latest/chain.api#operation/get_account
     */
    static getAccountFromAccountName({ accountName }: {
        accountName: string;
    }): Promise<WAXAccountInfo>;
    /**
     * Get the balance of an account
     * @external https://docs.eosnetwork.com/apis/spring/latest/chain.api#operation/get_currency_balance
     */
    static getBalanceFromAccountName({ accountName, token, contract }: {
        accountName: string;
        token: string;
        contract: string;
    }): Promise<string>;
}
export { EOS };
//# sourceMappingURL=eos.d.ts.map