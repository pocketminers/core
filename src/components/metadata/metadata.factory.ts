import { BaseIdentifier, BaseIdentifierType, BaseIdentifierTypes } from "@templates/v0/base/identifier";
import { BaseMetadataAnnotations, BaseMetadataEntry, BaseMetadataLabels } from "@templates/v0/base/metadata";
import { BaseObjectType, BaseObjectTypes } from "@templates/v0/base/object";
import { BaseTimestamps } from "@templates/v0/base/timestamps";
import { Metadata } from ".";

class MetadataFactory {

    public static createDefaultMetadata
    <
        I extends BaseIdentifierType,
        O extends BaseObjectType
    >(
        metadata?: BaseMetadataEntry<I, O>
    ): Metadata<I, O> {
        if (metadata !== undefined) {
            return new Metadata<I, O>(metadata);
        }

        // Create default metadata
        const id: BaseIdentifier<I> = {
            type_: BaseIdentifierTypes.Undefined as I,
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
    MetadataFactory
}