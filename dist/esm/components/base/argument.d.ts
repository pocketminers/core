import { BaseArgument, BaseValue, BaseValueKey } from "../../templates/v0/index.js";
import { Immuteable, ImmuteableConfigurationOptions } from "../base/immuteable.js";
/**
 * PocketArgumentConfigurationOptions is an interface that represents the configuration for a PocketArgument.
 * - It is used to encapsulate optional settings for the PocketArgument class.
 */
interface PocketArgumentConfigurationOptions extends ImmuteableConfigurationOptions, Partial<Record<'allowEmpty', boolean>> {
}
/**
 * PocketARgumentEntry is an interface that represents a key-value pair.
 * - It is used to encapsulate arguments in the Pocket framework.
 */
interface PocketArgumentEntry<T = any> extends Record<'name', BaseValueKey>, Record<'value', BaseValue<T>>, Partial<Record<'configuration', PocketArgumentConfigurationOptions>> {
}
/**
 * PocketArgument is a class that represents a key-value pair.
 * - It is used to encapsulate arguments in the Pocket framework.
 * - The class is generic and can be used with different types of values.
 * - This class does not extend the PocketObject class, as it does not include a metadata object.
 * - This class is designed to be immutable after creation, but can be left unfrozen by setting the 'freeze' option.
 * - The class includes methods for creating PocketArgument objects from strings, records, key-value pairs, and JSON.
 *
 * @template T - The type of the value. It can be any type.
 *
 * @example
 * const arg = new PocketArgument({
 *     name: "arg1",
 *    value: "value1"
 * });
 * console.log(arg.toString()); // Output: "arg1: value1"
 */
declare class PocketArgument<T = any> extends Immuteable implements BaseArgument<T> {
    /**
     * The name of the argument.
     * - It is a required field and cannot be empty.
     */
    readonly name: BaseValueKey;
    /**
     * The value of the argument.
     * - It is a required field, but can be empty if allowEmpty is true.
     */
    readonly value: BaseValue<T>;
    static readonly defaultOptions: {
        freeze: boolean;
        allowEmpty: boolean;
    };
    /**
     * The constructor initializes the name and value properties with the provided arguments.
     * If the name or value is empty, it throws an error.
     *
     * @param name - The name of the argument.
     * @param value - The value of the argument.
     * @param configuration - Optional settings for the argument.
     */
    constructor({ name, value, configuration: { freeze, allowEmpty } }: PocketArgumentEntry<T>);
    get nameString(): string;
    static checkIfValid({ name, value, configuration: { freeze, allowEmpty } }: PocketArgumentEntry): boolean;
    /**
     * Creates a PocketArgument from a string.
     * Expects the string to be in the format "name=value", "name:value", or JSON.
     */
    static fromString<T = any>(str: string): PocketArgument<T>;
    /**
     * Creates a PocketArgument from a record.
     * Expects the record to contain only one key-value pair.
     */
    static fromRecord<T = any>(record: Record<BaseValueKey, BaseValue<T>>): PocketArgument<T>;
    /**
     * Creates a PocketArgument from a key-value pair.
     * Expects the key-value pair to be an array of two elements.
     */
    static fromKeyValuePair<T = any>(keyValuePair: [BaseValueKey, BaseValue<T>]): PocketArgument<T>;
    /**
     * Creates a PocketArgument from a JSON string.
     * - Expects the JSON string to be in the format { "name": "key", "value": "value" }.
     *
     * @example
     * const json = '{"name":"arg1","value":"value1"}';
     * const arg = PocketArgument.fromJSON(json);
     * console.log(arg.toString()); // Output: "arg1: value1"
     */
    static fromJSON<T = any>(json: string): PocketArgument<T>;
    /**
     * Creates a PocketArgument from an object.
     * - Expects the object to contain a name and value property.
     *
     * @example
     * const obj = {
     *    name: "arg1",
     *    value: "value1"
     * };
     * const arg = PocketArgument.fromObject(obj);
     * console.log(arg.toString()); // Output: "arg1: value1"
     */
    static fromObject<T = any>(obj: {
        name: BaseValueKey;
        value: BaseValue<T>;
    }): PocketArgument<T>;
    /**
     * Returns a JSON string representation of the PocketArgument object.
     * @example
     * const arg = new PocketArgument({
     *    name: "arg1",
     *    value: "value1"
     * });
     * console.log(arg.toJSON()); // Output: '{"name":"arg1","value":"value1"}'
     */
    toJSON(): string;
    /**
     * Returns a string representation of the PocketArgument object.
     * @example
     * const arg = new PocketArgument({
     *    name: "arg1",
     *    value: "value1"
     * });
     * console.log(arg.toString()); // Output: "arg1: value1"
     */
    toString(): string;
    /**
     * Returns an object representation of the PocketArgument object.
     * @example
     * const arg = new PocketArgument({
     *   name: "arg1",
     *   value: "value1"
     * });
     * console.log(arg.toObject()); // Output: { name: "arg1", value: "value1" }
     */
    toObject(): {
        name: BaseValueKey;
        value: BaseValue<T>;
    };
    /**
     * Returns a record representation of the PocketArgument object.
     * @example
     * const arg = new PocketArgument({
     *   name: "arg1",
     *   value: "value1"
     * });
     * console.log(arg.toRecord()); // Output: { arg1: "value1" }
     */
    toRecord(): Record<BaseValueKey, BaseValue<T>>;
    /**
     * Returns a key-value pair representation of the PocketArgument object.
     * @example
     * const arg = new PocketArgument({
     *   name: "arg1",
     *   value: "value1"
     * });
     * console.log(arg.toKeyValuePair()); // Output: ["arg1", "value1"]
     */
    toKeyValuePair(): [BaseValueKey, BaseValue<T>];
}
export { PocketArgument, type PocketArgumentEntry, type PocketArgumentConfigurationOptions };
//# sourceMappingURL=argument.d.ts.map