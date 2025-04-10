"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocketObject = void 0;
const metadata_1 = require("../metadata");
const freezer_1 = require("../../utilities/freezer");
class PocketObject {
    data;
    metadata;
    constructor(data, metadata) {
        this.data = data;
        this.metadata = metadata !== undefined ? metadata : metadata_1.Metadata.createDefaultMetadata();
        freezer_1.Freezer.deepFreeze(this);
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
exports.PocketObject = PocketObject;
//# sourceMappingURL=object.js.map