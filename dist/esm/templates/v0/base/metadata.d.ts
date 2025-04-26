import { BaseIdentifier, BaseIdentifierFormat } from "../../v0/base/identifier.js";
import { BaseValue, BaseValueKey, StringOrEmpty } from "../../v0/base/value.js";
import { BaseTimestamps } from "../../v0/base/timestamps.js";
import { BaseObjectType } from "./object.js";
/**
 * Annotations are key-value pairs that provide additional information about the user account.
 * - Annotations can be used to store metadata or other information that is not part of the main data structure.
 * - Generally, will not include identifiers - these should be placed in the labels object.
 * - Annotations are descriptive and can be used to provide context or additional information about the data.
 * @example
 * const annotations: BaseMetadataAnnotations = {
 *  description: "This is a description",
 *  customKey: "customValue"
 * };
 */
interface BaseMetadataAnnotations extends Partial<Record<'description', StringOrEmpty>>, Partial<Record<BaseValueKey, BaseValue>> {
}
/**
 * Labels are key-value pairs that can be used to categorize or tag the user account.
 * - They can be used for filtering or searching purposes.
 * - Labels can be used to group similar objects together.
 * - 'BaseIdentifiers should be placed in the labels object.
 *
 * @template I - The type of the identifier. It is one of the BaseIdentifierFormat types.
 * @template O - The type of the object. It is one of the BaseObjectType types.
 *
 * @example
 * const labels: BaseMetadataLabels<BaseIdentifierFormats.Number, BaseObjects.Configuration> = {
 *   id: { value: 123, format: BaseIdentifierFormats.Number },
 *   name: "My Label",
 *   type: BaseObjects.Configuration,
 *   tags: ["tag1", "tag2"],
 *   customKey: "customValue"
 * };
 */
interface BaseMetadataLabels<I extends BaseIdentifierFormat, O extends BaseObjectType> extends Partial<Record<'id', BaseIdentifier<I>>>, Partial<Record<'name', StringOrEmpty>>, Partial<Record<'type', O>>, Partial<Record<'tags', Array<StringOrEmpty>>>, Partial<Record<BaseValueKey, BaseValue>> {
}
/**
 * PocketMetadata contains identifiers, labels, annotations, and timestamps.
 *
 * @template I - The type of the identifier. It is one of the BaseIdentifierFormat types.
 * @template O - The type of the object. It is one of the BaseObjectType types.
 *
 * @example
 * const metadata: BaseMetadata<BaseIdentifierFormats.Number, BaseObjects.Configuration> = {
 *   annotations: {
 *     description: "This is a description",
 *     customKey: "customValue"
 *   },
 *  labels: {
 *    id: { value: 123, format: BaseIdentifierFormats.Number },
 *    name: "My Label",
 *    type: BaseObjects.Configuration,
 *    tags: ["tag1", "tag2"],
 *    customKey: "customValue"
 * },
 *  timestamps: {
 *    createdAt: new Date(),
 *    updatedAt: new Date()
 *  }
 * };
 */
interface BaseMetadata<I extends BaseIdentifierFormat, O extends BaseObjectType> extends Partial<Record<'annotations', BaseMetadataAnnotations>>, Partial<Record<'labels', BaseMetadataLabels<I, O>>>, Partial<Record<'timestamps', BaseTimestamps>> {
}
/**
 * BaseMetadataEntry is a generic interface that represents an entry in the metadata.
 * - It contains properties such as id, name, description, tags, timestamps, annotations, and labels.
 * - Id, type, name, and tags, are stored in the labels object upon creation.
 * - Description is stored in the annotations object upon creation.
 *
 * @template I - The type of the identifier. It is one of the BaseIdentifierFormat types.
 * @template O - The type of the object. It is one of the BaseObjectType types.
 *
 * @example
 * const metadataEntry: BaseMetadataEntry<BaseIdentifierFormats.Number, BaseObjects.Configuration> = {
 *   id: { value: 123, format: BaseIdentifierFormats.Number },
 *   name: "My Entry",
 *   description: "This is a description",
 *   tags: ["tag1", "tag2"],
 *   timestamps: {
 *     createdAt: new Date(),
 *     updatedAt: new Date()
 *   },
 *   annotations: {
 *     customAnnotation: "customValue1"
 *   },
 *   labels: {
 *     customLabels: "customValue2"
 *   }
 * };
 */
interface BaseMetadataEntry<I extends BaseIdentifierFormat, O extends BaseObjectType> extends Partial<Record<'id', BaseIdentifier<I>>>, Partial<Record<'type', O>>, Partial<Record<'name', StringOrEmpty>>, Partial<Record<'description', StringOrEmpty>>, Partial<Record<'tags', Array<StringOrEmpty>>>, Partial<Record<'timestamps', BaseTimestamps>>, Partial<Record<'annotations', BaseMetadataAnnotations>>, Partial<Record<'labels', BaseMetadataLabels<I, O>>> {
}
export { type BaseMetadata, type BaseMetadataAnnotations, type BaseMetadataLabels, type BaseMetadataEntry, };
//# sourceMappingURL=metadata.d.ts.map