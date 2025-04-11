import { BaseIdentifier, BaseIdentifierType } from "../../templates/v0/base/identifier";
import { BaseMetadata, BaseMetadataAnnotations, BaseMetadataEntry, BaseMetadataLabels } from "../../templates/v0/base/metadata";
import { BaseObjectType } from "../../templates/v0/base/object";
import { BaseTimestamps } from "../../templates/v0/base/timestamps";
declare class Metadata<I extends BaseIdentifierType, O extends BaseObjectType> implements BaseMetadata<I, O> {
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
}
export { Metadata };
export * from "./metadata.factory";
//# sourceMappingURL=index.d.ts.map