import { BaseIdentifier, BaseIdentifierType, BaseIdentifierTypes } from "@templates/v0/base/identifier";
import { BaseMetadata, BaseMetadataAnnotations, BaseMetadataEntry, BaseMetadataLabels } from "@templates/v0/base/metadata";
import { BaseObjectType, BaseObjectTypes } from "@templates/v0/base/object";
import { BaseTimestamps } from "@templates/v0/base/timestamps";
import { Freezer } from "@utilities/freezer";

class Metadata
<
    I extends BaseIdentifierType,
    O extends BaseObjectType,
>
    implements
        BaseMetadata<I, O>
{
    public readonly annotations: BaseMetadataAnnotations;
    public readonly labels: BaseMetadataLabels<I, O>;
    public readonly timestamps: BaseTimestamps;

    constructor({
        id,
        name,
        type,
        description,
        tags,
        timestamps = {
            created: { date: new Date() },
            updated: { date: new Date() }
        },
        annotations,
        labels
    }: BaseMetadataEntry<I, O> = {} ) {
        this.annotations = this.addAnnotations({
            description,
            ...annotations
        });

        this.labels = {
            id,
            name,
            tags,
            type,
            ...labels
        };

        this.timestamps = {
            created: timestamps.created || { date: new Date() },
            updated: timestamps.updated || { date: new Date() },
            ...timestamps
        };

        Freezer.deepFreeze(this);
    }

    private addAnnotations(
        annotations: BaseMetadataAnnotations
    ): BaseMetadataAnnotations {
        for (const key in annotations) {
            if (annotations[key] === undefined) {
                delete annotations[key];
            }
        }
        return {
            ...this.annotations,
            ...annotations
        };
    }

    public toJSON(): {
        annotations: BaseMetadataAnnotations;
        labels: BaseMetadataLabels<I, O>;
        timestamps: BaseTimestamps;
    } {
        return {
            annotations: this.annotations,
            labels: this.labels,
            timestamps: this.timestamps
        };
    }


    public toString(): string {
        return JSON.stringify({
            annotations: this.annotations,
            labels: this.labels,
            timestamps: this.timestamps
        });
    }


}

export {
    Metadata
}