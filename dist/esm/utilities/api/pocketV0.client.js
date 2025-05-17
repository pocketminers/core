import { SecretManager } from "../secret.js";
import { BaseApiClient } from "./client.js";
import { IdentifierUtilities } from "../identifier.js";
class PocketV0Client extends BaseApiClient {
    constructor() {
        const baseUrl = SecretManager.getSecret('POCKET_SERVICE_API_V0_URL') || 'https://dev.pocketminers.xyz/api/v0';
        const pocketApiKey = SecretManager.getSecret('POCKET_PUBLIC_API_KEY');
        super({
            baseUrl: baseUrl,
            headers: {
                'x-pocket-public-api-key': `txt:${pocketApiKey}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
                'User-Agent': 'PocketClient/1.0'
            }
        });
    }
    createPocketRequestHeaders() {
        const requestId = `txt:${IdentifierUtilities.generateUUIDv4()}`;
        return {
            ...this.headers,
            'x-pocket-request-id': requestId
        };
    }
}
export { PocketV0Client };
//# sourceMappingURL=pocketV0.client.js.map