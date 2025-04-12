"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocketObject = void 0;
const identifier_1 = require("../../templates/v0/base/identifier.js");
const metadata_1 = require("../metadata/index.js");
const freezer_1 = require("../../utilities/freezer.js");
const multiHash_1 = require("../../utilities/multiHash.js");
const metadata_factory_1 = require("../metadata/metadata.factory.js");
const checks_1 = require("../../utilities/checks.js");
class PocketObject {
    data;
    metadata;
    constructor({ data, metadata }) {
        this.checkData(data);
        this.checkMetadata(metadata);
        this.data = data;
        this.metadata = metadata !== undefined
            ? new metadata_1.Metadata(metadata)
            : metadata_factory_1.MetadataFactory.createDefaultMetadata();
        freezer_1.Freezer.deepFreeze(this);
    }
    checkData(data) {
        if (data === undefined) {
            throw new Error("Data is required");
        }
    }
    checkMetadata(metadata) {
    }
    /**
     * TODO: Revisit this method to use the metadata object
     */
    async checkDataHash(data, metadata) {
        this.checkData(data);
        const hash = await multiHash_1.MultiHashUtilities.generateMultihash(this.dataString);
        if (metadata === undefined) {
            return metadata_factory_1.MetadataFactory.createDefaultMetadata({
                id: {
                    type_: identifier_1.BaseIdentifierTypes.Multihash,
                    value: hash
                }
            });
        }
        if (metadata.labels.id?.type_ === identifier_1.BaseIdentifierTypes.Multihash) {
            const metadataHash = metadata.labels.id?.value;
            console.log("Metadata hash: ", metadataHash);
            console.log("Data hash: ", hash);
            if (checks_1.Checks.isEmpty(metadataHash) === false
                && metadataHash !== hash) {
                throw new Error("Data hash does not match metadata hash");
            }
        }
        else {
            metadata = new metadata_1.Metadata({
                ...metadata.toJSON(),
                labels: {
                    ...metadata.labels,
                    id: {
                        type_: identifier_1.BaseIdentifierTypes.Multihash,
                        value: hash
                    }
                }
            });
        }
        return metadata;
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
    get objectType() {
        return this.metadata.labels?.type;
    }
    isEmpty() {
        return this.data === undefined
            || this.dataString === "{}"
            || this.dataString === "[]"
            || this.dataString === ""
            || this.dataString === "null"
            || this.dataString === "undefined";
    }
    async toMultiHashIdentifier() {
        const meta = await this.checkDataHash(this.data, this.metadata);
        if (meta.labels.id === undefined) {
            throw new Error("Metadata id is required");
        }
        return {
            type_: identifier_1.BaseIdentifierTypes.Multihash,
            value: meta.labels.id?.value
        };
    }
}
exports.PocketObject = PocketObject;
//# sourceMappingURL=object.js.map