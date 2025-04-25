import { PocketV0DidClient } from "@utilities/api/pocketV0-did.client";


describe('PocketV0DidClient', () => {
    let client: PocketV0DidClient;

    beforeEach(() => {
        client = new PocketV0DidClient();
    });

    it('should create an instance of PocketV0DidClient', () => {
        expect(client).toBeInstanceOf(PocketV0DidClient);
        expect(client.baseUrl).toEqual('https://dev.pocketminers.xyz/api/v0');
        expect(client.headers).toEqual({
            'x-pocket-public-api-key': `txt:${process.env.REACT_APP_POCKET_PUBLIC_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'PocketClient/1.0'
        });
    });

    it('should ping the server', async () => {
        const response: Response = await client.ping();
        console.log('Response:', response);
        expect(response).toBeDefined();
    });
});