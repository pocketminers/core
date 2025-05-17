"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocketV0Client = void 0;
const secret_1 = require("../secret.js");
const client_1 = require("./client.js");
const identifier_1 = require("../identifier.js");
class PocketV0Client extends client_1.BaseApiClient {
    constructor() {
        const baseUrl = secret_1.SecretManager.getSecret('POCKET_SERVICE_API_V0_URL') || 'https://dev.pocketminers.xyz/api/v0';
        const pocketApiKey = secret_1.SecretManager.getSecret('POCKET_PUBLIC_API_KEY');
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
        const requestId = `txt:${identifier_1.IdentifierUtilities.generateUUIDv4()}`;
        return {
            ...this.headers,
            'x-pocket-request-id': requestId
        };
    }
}
exports.PocketV0Client = PocketV0Client;
//# sourceMappingURL=pocketV0.client.js.map