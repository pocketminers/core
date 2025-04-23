import { BaseIdentifier, BaseIdentifierFormat } from "../templates/v0/base/identifier.js";
import { BaseMetadata, BaseMetadataAnnotations, BaseMetadataEntry, BaseMetadataLabels } from "../templates/v0/base/metadata.js";
import { BaseObjectType } from "../templates/v0/base/object.js";
import { BaseTimestamps } from "../templates/v0/base/timestamps.js";
declare class Metadata<I extends BaseIdentifierFormat, O extends BaseObjectType> implements BaseMetadata<I, O> {
    readonly annotations: BaseMetadataAnnotations;
    readonly labels: BaseMetadataLabels<I, O>;
    readonly timestamps: BaseTimestamps;
    constructor({ id, name, type, description, tags, timestamps, annotations, labels }?: BaseMetadataEntry<I, O>);
    private addAnnotations;
    private addLabels;
    toJSON(): {
        annotations: BaseMetadataAnnotations;
        labels: BaseMetadataLabels<I, O>;
        timestamps: BaseTimestamps;
    };
    toString(): string;
    update({ annotations, labels, timestamps }: {
        annotations?: BaseMetadataAnnotations;
        labels?: BaseMetadataLabels<I, O>;
        timestamps?: BaseTimestamps;
    }): Metadata<I, O>;
    get id(): BaseIdentifier<I>;
    get type(): O;
    static createDefaultMetadata<I extends BaseIdentifierFormat, O extends BaseObjectType>(metadata?: BaseMetadataEntry<I, O>): Metadata<I, O>;
}
export { Metadata };
//# sourceMappingURL=metadata.d.ts.map