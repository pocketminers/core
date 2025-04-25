import { BaseApiClient } from '@utilities/api/client';
import { SecretManager } from '@utilities/secret';

describe('BaseApiClient', () => {

    let apiClient: BaseApiClient;

    beforeAll(() => {
        apiClient = new BaseApiClient({baseUrl: 'https://example.com/api/v0'});
    });

    it('should be able to create an instance of BaseApiClient', () => {
        expect(apiClient).toBeInstanceOf(BaseApiClient);
        expect(apiClient.baseUrl).toBe('https://example.com/api/v0');
        expect(apiClient.headers).toEqual({});
    });

});