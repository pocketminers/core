import { Metadata } from "../metadata";
import { Freezer } from "../../utilities/freezer";
class PocketObject {
    data;
    metadata;
    constructor(data, metadata) {
        this.data = data;
        this.metadata = metadata !== undefined ? metadata : Metadata.createDefaultMetadata();
        Freezer.deepFreeze(this);
    }
    get dataString() {
        return JSON.stringify(this.data);
    }
    get metadataString() {
        return JSON.stringify(this.metadata);
    }
    get objectString() {
        return JSON.stringify(this);
    }
}
export { PocketObject };
//# sourceMappingURL=object.js.map