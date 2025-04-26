import { BaseValue, BaseValueKey, StringOrEmpty } from "@templates/v0/base/value";


/**
 * BaseArgument is a generic type that represents an argument object.
 * - The name is equivalent to the name of the parameter.  If a key is specified, it will be used as the name of the argument.
 * 
 * @template T - The type of the value.
 * 
 * @example
 * const argument: BaseArgument<string> = {
 *    name: "arg1",
 *    value: "value1"
 * };
 */
interface BaseArgument
<
    T = any
>
    extends
        Record<'name', BaseValueKey>,
        Record<'value', BaseValue<T>>
{}


/**
 * BaseArguments is a generic type that represents a collection of arguments.
 * - Extends the Array type to allow for any number of arguments.
 * 
 * @template T - The type of the value.
 * 
 * @example
 * const arguments: BaseArguments<string> = [
 *   { name: "arg1", value: "value1" },
 *   { name: "arg2", value: "value2" }
 * ];
 */
interface BaseArguments
<
    T = any
>
    extends
        Array<BaseArgument<T>>
{}


/**
 * BaseParameter is a generic type that represents a parameter object.
 * 
 * @template T - The type of the value.
 * 
 * @example
 * const parameter: BaseParameter<string> = {
 *   name: "param1",
 *   key: "param1",
 *   description: "This is a parameter",
 *   default: "default value",
 *   required: true,
 *   optional: ["optional value 1", "optional value 2"]
 * };
 */
interface BaseParameter
<
    T = any,
>
    extends
        Record<'name', BaseValueKey>,
        Record<'key', BaseValueKey | undefined>,
        Record<'description', StringOrEmpty>,
        Record<'required', boolean>,
        Record<'default', BaseValue<T> | undefined>,
        Record<'options', Array<BaseValue<T>>>
{}

/**
 * BaseParameters is a generic type that represents a collection of parameters.
 * - Extends the Array type to allow for any number of parameters.
 * 
 * @template T - The type of the value.
 * 
 * @example
 * const parameters: BaseParameters<string> = [
 *  {
 *    name: "param1",
 *    key: "param1",
 *    description: "This is a parameter",
 *    default: "default value",
 *    required: true,
 *    optional: ["optional value 1", "optional value 2"]
 *  },
 *  {
 *    name: "param2",
 *    key: "param2key",
 *    description: "This is another parameter, note the key is different from the name, it will be expecting an arg with the name param2key",
 *    default: "default value 2",
 *    required: false,
 *    optional: ["optional value 3"]
 *  }
 * ];
 */
interface BaseParameters
<
    T = any
>
    extends
        Array<BaseParameter<T>>
{}


/**
 * BaseProperty is a generic type that represents a property object.
 * - A BaseProperty is a BaseParameter with a value specified.
 * - It is used to specify a parameter and the value it is set to.
 * 
 * @template T - The type of the value.
 * 
 * @example
 * const property: BaseProperty<string> = {
 *   name: "property1",
 *   description: "This is a property",
 *   value: "value1",
 *   default: "value1",
 *   required: true,
 *   optional: ["value1", "value2"]
 */
interface BaseProperty
<
    T = any
>
    extends
        Record<'name', BaseValueKey>,
        Record<'description', StringOrEmpty>,
        Record<'value', BaseValue<T>>,
        Record<'default', BaseValue<T>>,
        Record<'required', boolean>,
        Record<'optional', Array<BaseValue<T>>>
{}


/**
 * BaseConfiguration is a generic type that represents a configuration object.
 * - It contains arguments and parameters.
 * 
 * @template T - The type of the value.
 * 
 * @example
 * const configuration: BaseConfiguration<string> = {
 *   arguments: [
 *     { name: "prop1", value: "value1" },
 *     { name: "prop2key", value: "value2" }
 *   ],
 *   parameters: [
 *     { 
 *       name: "prop1",
 *       key: "prop1",
 *       description: "This is a parameter",
 *       default: "default value",
 *       required: true,
 *       optional: ["optional value 1"]
 *     },
 *     {
 *       name: "prop2",
 *       key: "prop2key",
 *       description: "This is another parameter",
 *       default: "default value 2",
 *       required: false,
 *       optional: ["optional value 2"]
 *   ]
 * };
 */
interface BaseConfiguration
<
    T = any
>
    extends
        Record<'arguments', BaseArguments<T>>,
        Record<'parameters', BaseParameters<T>>
{}


export {
    type BaseArgument,
    type BaseArguments,
    type BaseParameter,
    type BaseParameters,
    type BaseProperty,
    type BaseConfiguration
}



