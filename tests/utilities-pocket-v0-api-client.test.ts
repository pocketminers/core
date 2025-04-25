import { PocketV0Client } from '@utilities/api/pocketV0.client';
import { SecretManager } from '@utilities/secret';

describe('PocketV0Client', () => {

    let apiClient: PocketV0Client;

    beforeAll(() => {
        apiClient = new PocketV0Client();
    });

    it('should be able to create an instance of PocketV0Client', () => {
        expect(apiClient).toBeInstanceOf(PocketV0Client);
        expect(apiClient.baseUrl).toBe('https://dev.pocketminers.xyz/api/v0');
        expect(apiClient.headers).toEqual({
            'x-pocket-public-api-key': `txt:${SecretManager.getSecret('POCKET_PUBLIC_API_KEY', { inReact: true })}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'PocketClient/1.0'
        });
    });

    it('should throw an error if the URL is invalid', () => {
        expect(() => PocketV0Client.checkUrl('invalid-url')).toThrowError('Invalid URL: invalid-url');
    });
});