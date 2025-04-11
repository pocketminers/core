import { BaseIdentifierTypes } from "../../templates/v0/base/identifier";
import { Metadata } from "../metadata";
import { Freezer } from "../../utilities/freezer";
import { MultiHashUtilities } from "../../utilities/multiHash";
import { MetadataFactory } from "../metadata/metadata.factory";
class PocketObject {
    data;
    metadata;
    constructor({ data, metadata }) {
        this.checkData(data);
        this.checkMetadata(metadata);
        this.data = data;
        this.metadata = metadata !== undefined
            ? new Metadata(metadata)
            : MetadataFactory.createDefaultMetadata();
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
            return MetadataFactory.createDefaultMetadata({
                id: {
                    type_: BaseIdentifierTypes.Multihash,
                    value: hash
                }
            });
        }
        const metadataHash = metadata.labels.id?.value;
        if (metadataHash !== undefined && metadataHash !== hash) {
            throw new Error("Data hash does not match metadata hash");
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
}
export { PocketObject };
//# sourceMappingURL=object.js.map