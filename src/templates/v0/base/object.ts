/**
 * file: object.ts
 * description: This file contains the definition of the BaseObject type and its associated types.
 * It is used to represent various types of objects that can be used in the Pocket Network.
 */

import { BaseIdentifierFormat, BaseIdentifierFormats } from "./identifier";
import { BaseMetadata } from "./metadata";


/**
 * BaseObjects is an enum that defines the various types of base objects.
 * These types are used to categorize different objects in the Pocket Network.
 * Each type is represented as a string.
 */
enum BaseObjects {
    Configuration = 'Configuration',
    Process = 'Process',
    Command = 'Command',
    Job = 'Job',
    Custom = 'Custom',
    Undefined = 'Undefined',
    Unknown = 'Unknown'
}


/**
 * BaseObjectType is a type alias for the keys of the BaseObjects enum.
 * It represents the different types of base objects that can be used in the Pocket Network.
 */
type BaseObjectType = keyof typeof BaseObjects;


/**
 * BaseObject is a generic interface that represents an object with a name, description, data, and metadata.
 * The data property can be of any type specified by the generic parameter T.
 */
interface BaseObject
<
    D,
    I extends BaseIdentifierFormat = BaseIdentifierFormats.Undefined,
    O extends BaseObjectType = BaseObjects.Undefined,
>
    extends
        Record<'data', D>,
        Partial<Record<'metadata', BaseMetadata<I, O>>>
{}


export {
    type BaseObject,
    type BaseObjectType,
    BaseObjects,
}