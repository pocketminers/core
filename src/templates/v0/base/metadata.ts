import { BaseValue, NumberOrEmpty, StringOrEmpty } from "./value";


/**
 * Annotations are key-value pairs that provide additional information about the user account.
 */
interface BaseMetadataAnnotations {
    description?: StringOrEmpty;
    [key: string]: BaseValue;
}


/**
 * Labels are key-value pairs that can be used to categorize or tag the user account.
 */
interface BaseMetadataLabels {
    id?: StringOrEmpty;
    name?: StringOrEmpty;
    version?: NumberOrEmpty | StringOrEmpty;
    tags?: (string | number)[] | null;
    [key: (string | number)]: BaseValue;
}


/**
 * Metadata contains additional information about the user account, including annotations and labels.
 */
interface BaseMetadata {
    annotations?: BaseMetadataAnnotations;
    labels?: BaseMetadataLabels;
}


export {
    type BaseMetadata,
    type BaseMetadataAnnotations,
    type BaseMetadataLabels
}