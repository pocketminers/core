import { BaseIdentifier, BaseIdentifierType, BaseIdentifierTypes } from "@templates/v0/base/identifier";
import { BaseValue, BaseValueKey, StringOrEmpty } from "@templates/v0/base/value";
import { BaseTimestamps } from "@templates/v0/base/timestamps";


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
    I extends BaseIdentifierType = BaseIdentifierTypes.Undefined
>
    extends 
        Partial<Record<'id', BaseIdentifier<I>>>,
        Partial<Record<'name', StringOrEmpty>>,
        Partial<Record<'tags', Array<StringOrEmpty>>>
{}


/**
 * Metadata contains additional information about the user account, including annotations and labels.
 */
interface BaseMetadata
<
    I extends BaseIdentifierType = BaseIdentifierTypes.Undefined
>
    extends
        Partial<Record<'annotations', BaseMetadataAnnotations>>,
        Partial<Record<'labels', BaseMetadataLabels<I>>>,
        Partial<Record<'timestamps', BaseTimestamps>>
{}


interface BaseMetadataEntry
<
    I extends BaseIdentifierType = BaseIdentifierTypes.Undefined
>
    extends
        Partial<Record<'id', BaseIdentifier<I>>>,
        Partial<Record<'name', StringOrEmpty>>,
        Partial<Record<'description', StringOrEmpty>>,
        Partial<Record<'tags', Array<StringOrEmpty>>>,
        Partial<Record<'timestamps', BaseTimestamps>>,
        Partial<Record<'annotations', BaseMetadataAnnotations>>,
        Partial<Record<'labels', BaseMetadataLabels<I>>>
{}


export {
    type BaseMetadata,
    type BaseMetadataAnnotations,
    type BaseMetadataLabels,
    type BaseMetadataEntry,
}