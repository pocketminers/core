/**
 * file: object.ts
 * description: This file contains the definition of the BaseObject type and its associated types.
 * It is used to represent various types of objects that can be used in the Pocket Network.
 */

import { BaseIdentifierType, BaseIdentifierTypes } from "./identifier";
import { BaseMetadata } from "./metadata";
import { BaseValue, BaseValueKey } from "./value";


/**
 * BaseObject is a generic interface that represents an object with a name, description, data, and metadata.
 * The data property can be of any type specified by the generic parameter T.
 */
interface BaseObject
<
    T extends Record<BaseValueKey, BaseValue>,
    I extends BaseIdentifierType = BaseIdentifierTypes.Undefined
>
    extends
        Record<'data', T>,
        Partial<Record<'metadata', BaseMetadata<I>>>
{}


export {
    type BaseObject
}