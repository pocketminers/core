import { BaseIdentifierFormats } from "../templates/v0/base/identifier.js";
import { Metadata } from "./metadata.js";
import { Freezer } from "../utilities/freezer.js";
import { MultiHashUtilities } from "../utilities/multiHash.js";
import { Checks } from "../utilities/checks.js";
class PocketObject {
    data;
    metadata;
    constructor({ data, metadata }) {
        this.checkData(data);
        this.checkMetadata(metadata);
        this.data = data;
        this.metadata = metadata !== undefined
            ? new Metadata(metadata)
            : Metadata.createDefaultMetadata();
        Freezer.deepFreeze(this);
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
        const hash = await MultiHashUtilities.generateMultihash(this.dataString);
        if (metadata === undefined) {
            return Metadata.createDefaultMetadata({
                id: {
                    format: BaseIdentifierFormats.Multihash,
                    value: hash
                }
            });
        }
        if (metadata.labels.id?.format === BaseIdentifierFormats.Multihash) {
            const metadataHash = metadata.labels.id?.value;
            console.log("Metadata hash: ", metadataHash);
            console.log("Data hash: ", hash);
            if (Checks.isEmpty(metadataHash) === false
                && metadataHash !== hash) {
                throw new Error("Data hash does not match metadata hash");
            }
        }
        else {
            metadata = new Metadata({
                ...metadata.toJSON(),
                labels: {
                    ...metadata.labels,
                    id: {
                        format: BaseIdentifierFormats.Multihash,
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
            format: BaseIdentifierFormats.Multihash,
            value: meta.labels.id?.value
        };
    }
}
export { PocketObject };
//# sourceMappingURL=object.js.map