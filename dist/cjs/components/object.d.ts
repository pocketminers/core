import { BaseObject, BaseObjectType } from "../templates/v0/base/object.js";
import { BaseIdentifier, BaseIdentifierFormat, BaseIdentifierFormats } from "../templates/v0/base/identifier.js";
import { PocketMetadata } from "./metadata.js";
/**
 * PocketObject is a class that represents an object in the Pocket framework.
 * - It is a generic class that can be used with different types of data and metadata.
 * - The class is designed to be immutable after creation.
 *
 * @template D - The type of the data. It can be any type.
 * @template I - The type of the identifier. It is one of the BaseIdentifierFormat types.
 * @template O - The type of the object. It is one of the BaseObjectType types.
 */
declare class PocketObject<D, I extends BaseIdentifierFormat, O extends BaseObjectType> implements BaseObject<D, I, O> {
    data: D;
    metadata: PocketMetadata<I, O>;
    constructor({ data, metadata }: {
        data: D;
        metadata?: PocketMetadata<I, O>;
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