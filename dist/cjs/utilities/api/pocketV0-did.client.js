"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocketV0DidClient = void 0;
const pocketV0_client_1 = require("./pocketV0.client.js");
class PocketV0DidClient extends pocketV0_client_1.PocketV0Client {
    constructor() {
        super();
    }
    async ping() {
        const endpoint = '/ping';
        return await this.get(endpoint);
    }
}
exports.PocketV0DidClient = PocketV0DidClient;
//# sourceMappingURL=pocketV0-did.client.js.map