import { BaseValue, BaseValueKey, StringOrEmpty } from "@templates/v0/base/value";
import { BaseObject, BaseObjectTypes } from "./object";
import { BaseIdentifierTypes } from "./identifier";



/**
 * BaseArgument is a generic type that represents an argument object.
 */
interface BaseArgument<T>
    extends
        BaseObject<
            {
                name: BaseValueKey;
                value: BaseValue<T>;
            },
            BaseIdentifierTypes.Multihash | BaseIdentifierTypes.Undefined,
            BaseObjectTypes.Argument
        >
{}


/**
 * BaseParameter is a generic type that represents a parameter object.
 */
interface BaseParameter
<
    T
>
    extends
        BaseObject
        <
            {
                name: BaseValueKey;
                description: StringOrEmpty;
                default: BaseValue<T>;
                required: boolean;
                optional: Array<BaseValue<T>>;
            },
            BaseIdentifierTypes.Multihash,
            BaseObjectTypes.Parameter
        >
{}


/**
 * Configuration is a generic type that represents a configuration object.
 * It can contain any number of properties, each of which can be of any type.
 */
interface BaseProperty<T extends BaseValue>
    extends
        BaseObject<{
            name: BaseValueKey;
            description: StringOrEmpty;
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



