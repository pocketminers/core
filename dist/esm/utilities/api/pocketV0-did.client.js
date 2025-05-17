import { PocketV0Client } from "./pocketV0.client.js";
class PocketV0DidClient extends PocketV0Client {
    constructor() {
        super();
    }
    async ping() {
        const endpoint = '/ping';
        return await this.get(endpoint);
    }
}
export { PocketV0DidClient };
//# sourceMappingURL=pocketV0-did.client.js.map