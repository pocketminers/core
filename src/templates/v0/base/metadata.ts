import { BaseIdentifier, BaseIdentifierType, BaseIdentifierTypes } from "@templates/v0/base/identifier";
import { BaseValue, BaseValueKey, StringOrEmpty } from "@templates/v0/base/value";
import { BaseTimestamps } from "@templates/v0/base/timestamps";
import { BaseObjectType, BaseObjectTypes } from "./object";


/**
 * Annotations are key-value pairs that provide additional information about the user account.
 */
interface BaseMetadataAnnotations 
    extends
        Partial<Record<'description', StringOrEmpty>>,
        Partial<Record<BaseValueKey, BaseValue>>
{}


/**
 * Labels are key-value pairs that can be used to categorize or tag the user account.
 */
interface BaseMetadataLabels
<
    I extends BaseIdentifierType,
    T extends BaseObjectType
>
    extends 
        Partial<Record<'id', BaseIdentifier<I>>>,
        Partial<Record<'name', StringOrEmpty>>,
        Partial<Record<'type', T>>,
        Partial<Record<'tags', Array<StringOrEmpty>>>,
        Partial<Record<BaseValueKey, BaseValue>>
{}


/**
 * Metadata contains additional information about the user account, including annotations and labels.
 */
interface BaseMetadata
<
    I extends BaseIdentifierType,
    T extends BaseObjectType,
>
    extends
        Partial<Record<'annotations', BaseMetadataAnnotations>>,
        Partial<Record<'labels', BaseMetadataLabels<I, T>>>,
        Partial<Record<'timestamps', BaseTimestamps>>
{}


/**
 * BaseMetadataEntry is a generic interface that represents an entry in the metadata.
 * It contains properties such as id, name, description, tags, timestamps, annotations, and labels.
 */
interface BaseMetadataEntry
<
    I extends BaseIdentifierType,
    T extends BaseObjectType
>
    extends
        Partial<Record<'id', BaseIdentifier<I>>>,
        Partial<Record<'type', T>>,
        Partial<Record<'name', StringOrEmpty>>,
        Partial<Record<'description', StringOrEmpty>>,
        Partial<Record<'tags', Array<StringOrEmpty>>>,
        Partial<Record<'timestamps', BaseTimestamps>>,
        Partial<Record<'annotations', BaseMetadataAnnotations>>,
        Partial<Record<'labels', BaseMetadataLabels<I, T>>>
{}


export {
    type BaseMetadata,
    type BaseMetadataAnnotations,
    type BaseMetadataLabels,
    type BaseMetadataEntry,
}