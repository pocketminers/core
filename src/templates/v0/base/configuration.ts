import { BaseValue, BaseValueKey, StringOrEmpty } from "@templates/v0/base/value";
import { BaseObject, BaseObjectTypes } from "./object";
import { BaseIdentifierType, BaseIdentifierTypes } from "./identifier";


/**
 * BaseArgument is a generic type that represents an argument object.
 */
interface BaseArgument
<
    V,
    I extends BaseIdentifierType
>
    extends
        BaseObject<
            {
                name: BaseValueKey;
                value: BaseValue<V>;
            },
            I | BaseIdentifierTypes.Multihash,
            BaseObjectTypes.Argument
        >
{}


/**
 * BaseParameter is a generic type that represents a parameter object.
 */
interface BaseParameter
<
    V,
    I extends BaseIdentifierType
>
    extends
        BaseObject
        <
            {
                name: BaseValueKey;
                description: StringOrEmpty;
                default: BaseValue<V>;
                required: boolean;
                optional: Array<BaseValue<V>>;
            },
            I | BaseIdentifierTypes.Multihash,
            BaseObjectTypes.Parameter
        >
{}


/**
 * Configuration is a generic type that represents a configuration object.
 * It can contain any number of properties, each of which can be of any type.
 */
interface BaseProperty
<
    V,
    I extends BaseIdentifierType
>
    extends
        BaseObject
        <
            {
                name: BaseValueKey;
                description: StringOrEmpty;
                value: V;
                default: V;
                required: boolean;
                optional: Array<V>;
            },
            I | BaseIdentifierTypes.Multihash,
            BaseObjectTypes.Property
        >
{}


/**
 * Configuration is a generic type that represents a configuration object.
 * It can contain any number of properties, each of which can be of any type.
 */
interface BaseConfiguration
<
    V,
    I extends BaseIdentifierTypes
>
    extends
        BaseObject
        <
            {
                arguments: Array<BaseArgument<V, I>>;
                parameters: Array<BaseParameter<V, I>>;
            },
            I | BaseIdentifierTypes.Multihash,
            BaseObjectTypes.Configuration
        >
{}


export {
    type BaseArgument,
    type BaseParameter,
    type BaseProperty,
    type BaseConfiguration,
}



