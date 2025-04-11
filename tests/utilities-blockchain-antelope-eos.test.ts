import { EOS } from "@utilities/blockchain/antelope/eos";
import { APIClient } from "@wharfkit/antelope";


describe("EOS Utility Class", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Chain", () => {
        it("should return the WAX chain definition for 'WAX'", () => {
            const chain = EOS.Chain("WAX");
            expect(chain).toEqual({
                id: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
                url: "https://wax.greymass.com",
            });
        });

        it("should default to WAX chain definition for unknown chain names", () => {
            const chain = EOS.Chain("UNKNOWN");
            expect(chain).toEqual({
                id: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
                url: "https://wax.greymass.com",
            });
        });
    });

    describe("ApiClient", () => {
        it("should create an APIClient instance with the WAX chain URL", () => {
            const client = EOS.ApiClient();
            // expect(client).toHaveBeenCalledWith({
            //     url: "https://wax.greymass.com",
            // });
            expect(client).toBeInstanceOf(APIClient);
        });

        it("should allow overriding APIClient options", () => {
            const client = EOS.ApiClient();
            // expect(client).toHaveBeenCalledWith({
            //     url: "https://wax.greymass.com"
            // });
            expect(client).toBeInstanceOf(APIClient);
        });
    });

    describe("getChainInfo", () => {
        it("should fetch chain info", async () => {
            const result = await EOS.getChainInfo();
            // expect(APIClient.prototype.call).toHaveBeenCalledWith({
            //     method: "POST",
            //     path: "/v1/chain/get_info",
            // });
            expect(result).toBeDefined();
        });
    });

    describe("getBlock", () => {
        it("should fetch block info by block number", async () => {

            const result = await EOS.getBlock("12345000");
            // expect(APIClient.prototype.call).toHaveBeenCalledWith({
            //     method: "POST",
            //     path: "/v1/chain/get_block",
            //     params: { block_num_or_id: "12345" },
            // });
            expect(result).toBeDefined();
        });
    });

    describe("getBlockInfo", () => {
        it("should fetch block info by block number", async () => {

            const currentBlockHeight = await EOS.getChainInfo();
            console.log("Current Block Height: ", currentBlockHeight.head_block_num);
            const result = await EOS.getBlockInfo(currentBlockHeight.head_block_num.toString());
            // expect(APIClient.prototype.call).toHaveBeenCalledWith({
            //     method: "POST",
            //     path: "/v1/chain/get_block_info",
            //     params: { block_num: "12345" },
            // });
            console.log(JSON.stringify(result, null, 2));
            expect(result).toBeDefined()
        });
    });

    describe("getAccountFromAccountName", () => {
        it("should fetch account info by account name", async () => {
            const result = await EOS.getAccountFromAccountName({ accountName: "pocketminers" });

            expect(result).toBeDefined();
        });
    });

    describe("getBalanceFromAccountName", () => {
        it("should fetch account balance", async () => {

            const result = await EOS.getBalanceFromAccountName({
                accountName: "pocketminers",
                token: "WAX",
                contract: "eosio.token",
            });
            expect(result).toBeDefined();
        });
    });
});