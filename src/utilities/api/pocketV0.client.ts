import { SecretManager } from "@utilities/secret";
import { BaseApiClient } from "./client";


class PocketV0Client extends BaseApiClient {

    public constructor() {
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
}

export {
    PocketV0Client
}