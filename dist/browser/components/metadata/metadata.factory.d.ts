import { BaseIdentifierType } from "../../templates/v0/base/identifier";
import { BaseMetadataEntry } from "../../templates/v0/base/metadata";
import { BaseObjectType } from "../../templates/v0/base/object";
import { Metadata } from ".";
declare class MetadataFactory {
    static createDefaultMetadata<I extends BaseIdentifierType, O extends BaseObjectType>(metadata?: BaseMetadataEntry<I, O>): Metadata<I, O>;
}
export { MetadataFactory };
//# sourceMappingURL=metadata.factory.d.ts.map