import { BaseIdentifierType } from "../../templates/v0/base/identifier.js";
import { BaseMetadataEntry } from "../../templates/v0/base/metadata.js";
import { BaseObjectType } from "../../templates/v0/base/object.js";
import { Metadata } from "./index.js";
declare class MetadataFactory {
    static createDefaultMetadata<I extends BaseIdentifierType, O extends BaseObjectType>(metadata?: BaseMetadataEntry<I, O>): Metadata<I, O>;
}
export { MetadataFactory };
//# sourceMappingURL=metadata.factory.d.ts.map