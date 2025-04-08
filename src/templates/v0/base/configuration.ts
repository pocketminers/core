import { BaseMetadata } from "@templates/v0/base/metadata";
import { BaseValue } from "@templates/v0/base/value";
import { BaseObject } from "./object";
import { BaseIdentifierType, BaseIdentifierTypes } from "./identifier";


/**
 * Configuration is a generic type that represents a configuration object.
 * It can contain any number of properties, each of which can be of any type.
 */
interface BaseArgument<T>
    extends
        BaseObject<
            {
                name: string;
                value: BaseValue<T>;
            }
        >
{}


/**
 * Configuration is a generic type that represents a configuration object.
 * It can contain any number of properties, each of which can be of any type.
 */
interface BaseParameter
<
    T extends BaseValue,
    I extends BaseIdentifierType = BaseIdentifierTypes.Undefined
>
    extends
        BaseObject<{
            name: string;
            description: string;
            default: T;
            required: boolean;
            optional: Array<T>;
        }>

{}


/**
 * Configuration is a generic type that represents a configuration object.
 * It can contain any number of properties, each of which can be of any type.
 */
interface BaseProperty<T extends BaseValue>
    extends
        BaseObject<{
            value: T;
            default: T;
            required: boolean;
            optional: Array<T>;
        }>
{}


/**
 * Configuration is a generic type that represents a configuration object.
 * It can contain any number of properties, each of which can be of any type.
 */
interface BaseConfiguration<T extends BaseValue>
    extends
        BaseObject<{
            arguments: Array<BaseArgument<T>>;
            parameters: Array<BaseParameter<T>>;
        }>
{}


export {
    type BaseArgument,
    type BaseParameter,
    type BaseProperty,
    type BaseConfiguration,
}



