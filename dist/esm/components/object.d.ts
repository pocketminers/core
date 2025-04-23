import { BaseObject, BaseObjectType } from "../templates/v0/base/object.js";
import { BaseIdentifier, BaseIdentifierFormat, BaseIdentifierFormats } from "../templates/v0/base/identifier.js";
import { Metadata } from "./metadata.js";
declare class PocketObject<D, I extends BaseIdentifierFormat, O extends BaseObjectType> implements BaseObject<D, I, O> {
    data: D;
    metadata: Metadata<I, O>;
    constructor({ data, metadata }: {
        data: D;
        metadata?: Metadata<I, O>;
    });
    private checkData;
    private checkMetadata;
    /**
     * TODO: Revisit this method to use the metadata object
     */
    private checkDataHash;
    get dataString(): string;
    get metadataString(): string;
    get objectString(): string;
    get objectType(): O;
    isEmpty(): boolean;
    toMultiHashIdentifier(): Promise<BaseIdentifier<BaseIdentifierFormats.Multihash>>;
}
export { PocketObject };
//# sourceMappingURL=object.d.ts.map