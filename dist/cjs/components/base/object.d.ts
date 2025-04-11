import { BaseObject, BaseObjectType } from "../../templates/v0/base/object";
import { BaseIdentifierType } from "../../templates/v0/base/identifier";
import { Metadata } from "../metadata";
declare class PocketObject<D, I extends BaseIdentifierType, O extends BaseObjectType> implements BaseObject<D, I, O> {
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
    get objectType(): O | undefined;
}
export { PocketObject };
//# sourceMappingURL=object.d.ts.map