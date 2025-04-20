import { BaseValue, BaseValueKey, StringOrEmpty } from "@templates/v0/base/value";
import { BaseObject, BaseObjectTypes } from "./object";
import { BaseIdentifierType, BaseIdentifierTypes } from "./identifier";
import { Metadata } from "@components/metadata";
import { BaseMetadataEntry } from "./metadata";


/**
 * BaseArgumentEntry is a generic type that represents an argument entry object.
 */
interface BaseArgumentEntry
<
    V
>
    extends
        Record<'name', BaseValueKey>,
        Record<'value', BaseValue<V>>
{}

/**
 * BaseArgument is a generic type that represents an argument object.
 */
interface BaseArgument
<
    V,
    I extends BaseIdentifierType
>
    extends
        BaseObject
        <
            BaseArgumentEntry<V>,
            I | BaseIdentifierTypes.Multihash,
            BaseObjectTypes.Argument
        >
{}

/**
 * BaseParameterEntry is a generic type that represents a parameter entry object.
 */
interface BaseParameterEntry
<
    V
>
    extends
        Record<'name', BaseValueKey>,
        Partial<Record<'description', StringOrEmpty>>,
        Partial<Record<'default', BaseValue<V>>>,
        Partial<Record<'required', boolean>>,
        Partial<Record<'optional', Array<BaseValue<V>>>>
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
            BaseParameterEntry<V>,
            I | BaseIdentifierTypes.Multihash,
            BaseObjectTypes.Parameter
        >
{}


/**
 * BasePropertyEntry is a generic type that represents a property entry object.
 */
interface BasePropertyEntry
<
    V
>
    extends
        Record<'name', BaseValueKey>,
        Record<'description', StringOrEmpty>,
        Record<'value', BaseValue<V>>,
        Record<'default', BaseValue<V>>,
        Record<'required', boolean>,
        Record<'optional', Array<BaseValue<V>>>
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
            BasePropertyEntry<V>,
            I | BaseIdentifierTypes.Multihash,
            BaseObjectTypes.Property
        >
{}


interface BaseConfigurationEntry
<
    V,
    I extends BaseIdentifierType
>
    extends
        Record<'arguments', Array<BaseArgument<V, I>>>,
        Record<'parameters', Array<BaseParameter<V, I>>>
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
            BaseConfigurationEntry<V, I>,
            I | BaseIdentifierTypes.Multihash,
            BaseObjectTypes.Configuration
        >
{}


export {
    type BaseArgument,
    type BaseArgumentEntry,
    type BaseParameter,
    type BaseParameterEntry,
    type BaseProperty,
    type BasePropertyEntry,
    type BaseConfiguration,
    type BaseConfigurationEntry
}



