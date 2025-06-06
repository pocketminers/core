"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocketObject = void 0;
const identifier_1 = require("../../templates/v0/base/identifier.js");
const metadata_1 = require("./metadata.js");
const freezer_1 = require("../../utilities/freezer.js");
const multiHash_1 = require("../../utilities/multiHash.js");
const checks_1 = require("../../utilities/checks.js");
/**
 * PocketObject is a class that represents an object in the Pocket framework.
 * - It is a generic class that can be used with different types of data and metadata.
 * - The class is designed to be immutable after creation.
 *
 * @template D - The type of the data. It can be any type.
 * @template I - The type of the identifier. It is one of the BaseIdentifierFormat types.
 * @template O - The type of the object. It is one of the BaseObjectType types.
 */
class PocketObject {
    data;
    metadata;
    constructor({ data, metadata }) {
        this.checkData(data);
        this.checkMetadata(metadata);
        this.data = data;
        this.metadata = metadata !== undefined
            ? new metadata_1.PocketMetadata(metadata)
            : metadata_1.PocketMetadata.createDefaultMetadata();
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
            return metadata_1.PocketMetadata.createDefaultMetadata({
                id: {
                    format: identifier_1.BaseIdentifierFormats.Multihash,
                    value: hash
                }
            });
        }
        if (metadata.labels.id?.format === identifier_1.BaseIdentifierFormats.Multihash) {
            const metadataHash = metadata.labels.id?.value;
            console.log("PocketMetadata hash: ", metadataHash);
            console.log("Data hash: ", hash);
            if (checks_1.Checks.isEmpty(metadataHash) === false
                && metadataHash !== hash) {
                throw new Error("Data hash does not match metadata hash");
            }
        }
        else {
            metadata = new metadata_1.PocketMetadata({
                ...metadata.toJSON(),
                labels: {
                    ...metadata.labels,
                    id: {
                        format: identifier_1.BaseIdentifierFormats.Multihash,
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
            throw new Error("PocketMetadata id is required");
        }
        return {
            format: identifier_1.BaseIdentifierFormats.Multihash,
            value: meta.labels.id?.value
        };
    }
}
exports.PocketObject = PocketObject;
//# sourceMappingURL=object.js.map