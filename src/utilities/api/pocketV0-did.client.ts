import { PocketV0Client } from "./pocketV0.client";

class PocketV0DidClient extends PocketV0Client {
    public constructor() {
        super();
    }

    public async ping(): Promise<Response> {
        const endpoint = '/ping';

        return await this.get<Response>(endpoint);
    }
}

export {
    PocketV0DidClient
}