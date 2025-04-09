import { BaseIdentifierType } from "../../templates/v0/base/identifier";
import { BaseMetadata, BaseMetadataAnnotations, BaseMetadataEntry, BaseMetadataLabels } from "../../templates/v0/base/metadata";
import { BaseObjectType } from "../../templates/v0/base/object";
import { BaseTimestamps } from "../../templates/v0/base/timestamps";
declare class Metadata<I extends BaseIdentifierType, T extends BaseObjectType> implements BaseMetadata<I, T> {
    readonly annotations: BaseMetadataAnnotations;
    readonly labels: BaseMetadataLabels<I, T>;
    readonly timestamps: BaseTimestamps;
    constructor({ id, name, type, description, tags, timestamps, annotations, labels }?: BaseMetadataEntry<I, T>);
}
export { Metadata };
//# sourceMappingURL=index.d.ts.map