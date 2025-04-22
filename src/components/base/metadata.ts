import { BaseIdentifier, BaseIdentifierFormat, BaseIdentifierFormats } from "@templates/v0/base/identifier";
import { BaseMetadata, BaseMetadataAnnotations, BaseMetadataEntry, BaseMetadataLabels } from "@templates/v0/base/metadata";
import { BaseObjectType, BaseObjectTypes } from "@templates/v0/base/object";
import { BaseTimestamps } from "@templates/v0/base/timestamps";
import { Freezer } from "@utilities/freezer";

class Metadata
<
    I extends BaseIdentifierFormat,
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

        this.labels = this.addLabels({
            id,
            name,
            type,
            tags,
            ...labels
        });

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

    private addLabels(
        labels: BaseMetadataLabels<I, O>
    ): BaseMetadataLabels<I, O> {
        for (const key in labels) {
            if (labels[key] === undefined) {
                delete labels[key];
            }
        }
        return {
            ...this.labels,
            ...labels
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

    public update({
        annotations,
        labels,
        timestamps
    }: {
        annotations?: BaseMetadataAnnotations;
        labels?: BaseMetadataLabels<I, O>;
        timestamps?: BaseTimestamps;
    }): Metadata<I, O> {
        // These Values are immuteable:
        // - timestamps.created
        // - timestamps.updated
        // - labels.id
        // - labels.type

        if (
            timestamps?.created
            && timestamps.created.date !== undefined
            && timestamps.created.date !== this.timestamps.created?.date
        ) {
            throw new Error("Cannot update timestamps.created");
        }

        if( 
            timestamps?.updated
            && timestamps.updated.date !== undefined
            && timestamps.updated.date !== this.timestamps.updated?.date
        ) {
            throw new Error("Cannot manually update timestamps.updated, the value is set to the current date");
        }

        if (
            labels?.id
            && labels.id.type_ !== BaseIdentifierFormats.Undefined
            && labels.id.value !== "undefined"
            && labels.id.value !== this.labels.id?.value
        ) {
            throw new Error("Cannot update labels.id");
        }

        if (
            labels?.type
            && labels.type !== BaseObjectTypes.Undefined
            && labels.type !== this.labels.type
        ) {
            throw new Error("Cannot update labels.type");
        }


        return new Metadata<I, O>({
            ...this.toJSON(),
            annotations: {
                ...this.annotations,
                ...annotations
            },
            labels: {
                ...this.labels,
                ...labels
            },
            timestamps: {
                ...this.timestamps,
                ...timestamps,
                updated: { date: new Date() }
            }
        });
    }

    public get id(): BaseIdentifier<I> {
        return this.labels.id as BaseIdentifier<I>;
    }

    public get type(): O {
        return this.labels.type as O;
    }

    public static createDefaultMetadata
    <
        I extends BaseIdentifierFormat,
        O extends BaseObjectType
    >(
        metadata?: BaseMetadataEntry<I, O>
    ): Metadata<I, O> {
        if (metadata !== undefined) {
            return new Metadata<I, O>(metadata);
        }

        // Create default metadata
        const id: BaseIdentifier<I> = {
            type_: BaseIdentifierFormats.Undefined as I,
            value: "undefined"
        };
        const name = "";
        const type = BaseObjectTypes.Undefined as O;
        const description = "";
        const tags: string[] = [];
        const timestamps: BaseTimestamps = {
            created: { date: new Date() },
            updated: { date: new Date() }
        };

        const annotations: BaseMetadataAnnotations = {
            description
        };

        const labels: BaseMetadataLabels<I, O> = {
            id,
            name,
            type,
            tags
        };

        return new Metadata<I, O>({
            annotations,
            labels,
            timestamps
        });
    }
}

export {
    Metadata
}