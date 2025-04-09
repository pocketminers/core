import { BaseIdentifier, BaseIdentifierType, BaseIdentifierTypes } from "@templates/v0/base/identifier";
import { BaseMetadata, BaseMetadataAnnotations, BaseMetadataEntry, BaseMetadataLabels } from "@templates/v0/base/metadata";
import { BaseObjectType, BaseObjectTypes } from "@templates/v0/base/object";
import { BaseTimestamps } from "@templates/v0/base/timestamps";

class Metadata
<
    I extends BaseIdentifierType,
    T extends BaseObjectType,
>
    implements
        BaseMetadata<I, T>
{
    public readonly annotations: BaseMetadataAnnotations;
    public readonly labels: BaseMetadataLabels<I, T>;
    public readonly timestamps: BaseTimestamps;

    constructor({
        id,
        name = "",
        type,
        description = "",
        tags = [],
        timestamps = {
            created: { date: new Date() },
            updated: { date: new Date() }
        },
        annotations = {},
        labels = {}
    }: BaseMetadataEntry<I,T> = {} ) {
        this.annotations = {
            description,
            ...annotations
        };

        this.labels = {
            id,
            name,
            tags,
            type,
            ...labels
        };

        this.timestamps = {
            created: timestamps.created,
            updated: timestamps.updated,
            ...timestamps
        };

        Object.freeze(this.annotations);
        Object.freeze(this.labels);

    }
}

export {
    Metadata
}