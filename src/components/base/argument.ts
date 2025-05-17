import { BaseArgument, BaseValue, BaseValueKey } from "@templates/v0";
import { Checks } from "@utilities/checks";
import { Immuteable, ImmuteableConfigurationOptions } from "@components/base/immuteable";


/**
 * PocketArgumentConfigurationOptions is an interface that represents the configuration for a PocketArgument.
 * - It is used to encapsulate optional settings for the PocketArgument class.
 */
interface PocketArgumentConfigurationOptions
    extends
        ImmuteableConfigurationOptions,
        Partial<Record<'allowEmpty', boolean>>
{}


/**
 * PocketARgumentEntry is an interface that represents a key-value pair.
 * - It is used to encapsulate arguments in the Pocket framework.
 */
interface PocketArgumentEntry
<
    T = any,
>
    extends
        Record<'name', BaseValueKey>,
        Record<'value', BaseValue<T>>,
        Partial<Record<'configuration', PocketArgumentConfigurationOptions>>
{}


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
class PocketArgument
<
    T = any,
>
    extends
        Immuteable
    implements
        BaseArgument<T>
{
    /**
     * The name of the argument.
     * - It is a required field and cannot be empty.
     */
    public readonly name: BaseValueKey;

    /**
     * The value of the argument.
     * - It is a required field, but can be empty if allowEmpty is true.
     */
    public readonly value: BaseValue<T>;

    public static readonly defaultOptions: {
        freeze: boolean;
        allowEmpty: boolean;
    } = {
        ...Immuteable.defaultOptions,
        allowEmpty: false
    };

    /**
     * The constructor initializes the name and value properties with the provided arguments.
     * If the name or value is empty, it throws an error.
     *
     * @param name - The name of the argument.
     * @param value - The value of the argument.
     * @param configuration - Optional settings for the argument.
     */
    constructor({
        name,
        value,
        configuration:{
            freeze,
            allowEmpty
        } = {
            freeze: PocketArgument.defaultOptions.freeze !== undefined ? PocketArgument.defaultOptions.freeze : true,
            allowEmpty: PocketArgument.defaultOptions.allowEmpty !== undefined ? PocketArgument.defaultOptions.allowEmpty : true
        }
    }: PocketArgumentEntry<T>) {
        // Check if the argument is valid
        PocketArgument.checkIfValid({
            name,
            value,
            configuration: {
                freeze: freeze !== undefined ? freeze : PocketArgument.defaultOptions.freeze,
                allowEmpty: allowEmpty !== undefined ? allowEmpty : PocketArgument.defaultOptions.allowEmpty
            }
        });

        super({ freeze, allowEmpty }, PocketArgument.prototype);

        this.name = name;
        this.value = value;

        this.initializeImmuteable({force: true});
    }
    
    public get nameString(): string {
        return String(this.name);
    }

    public static checkIfValid({
        name,
        value,
        configuration: {
            freeze,
            allowEmpty
        } = {
            freeze: PocketArgument.defaultOptions.freeze !== undefined ? PocketArgument.defaultOptions.freeze : true,
            allowEmpty: PocketArgument.defaultOptions.allowEmpty !== undefined ? PocketArgument.defaultOptions.allowEmpty : true
        }
    }: PocketArgumentEntry): boolean {
        if (
            name === undefined
            || name === null
        ) {
            throw new Error("Name is required");
        }

        if (
            allowEmpty == false 
            && Checks.isEmpty(value) == true
        ) {
            throw new Error(`Value for the ${String(name)} argument is required because allowEmpty is false`);
        }

        return true;    
    }

    /**
     * Creates a PocketArgument from a string.
     * Expects the string to be in the format "name=value", "name:value", or JSON.
     */
    public static fromString
    <
        T = any
    >(
        str: string
    ): PocketArgument<T> {
        if (
            str === undefined
            || Checks.isEmpty(str) == true
            || Checks.isEmpty(str.trim()) == true
            || str.trim().length === 0
        ) {
            throw new Error("String is required");
        }
        
        let parsed: { name: BaseValueKey; value: BaseValue<T> };
        try {
            if (
                str.startsWith("{")
                && str.endsWith("}")
            ) {
                // Check if the string is in JSON format
                parsed = JSON.parse(str);
            }
            else if (str.includes("=")) {
                // If the string contains "=", split it into key-value pair
                const [name, value] = str.split("=").map(part => part.trim());
                parsed = {
                    name,
                    value: value as BaseValue<T>
                };
            }
            else if (str.includes(":")) {
                // If the string contains ":", split it into key-value pair
                const [name, value] = str.split(":").map(part => part.trim());
                parsed = {
                    name,
                    value: value as BaseValue<T>
                };
            }
            else {
                throw new Error("Invalid string format");
            }
        } catch (error: any) {
            throw new Error("Invalid string format for deserialization " + error.message);
        }

        if (parsed.name === undefined || parsed.name === null) {
            throw new Error("Name is required in the serialized string");
        }

        if (parsed.value === undefined) {
            throw new Error("Value is required in the serialized string");
        }

        return new PocketArgument<T>({
            name: parsed.name,
            value: parsed.value
        });
    }

    /**
     * Creates a PocketArgument from a record.
     * Expects the record to contain only one key-value pair.
     */
    public static fromRecord
    <
        T = any
    >(
        record: Record<BaseValueKey, BaseValue<T>>
    ): PocketArgument<T> {
        if (record === undefined) {
            throw new Error("Record is required");
        }

        if (Object.keys(record).length === 0) {
            throw new Error("Record is empty");
        }
        
        if (Object.keys(record).length > 1) {
            throw new Error("Record must contain only one key-value pair");
        }

        const name = Object.keys(record)[0];
        const value = record[name];

        return new PocketArgument<T>({
            name,
            value
        });
    }

    /**
     * Creates a PocketArgument from a key-value pair.
     * Expects the key-value pair to be an array of two elements.
     */
    public static fromKeyValuePair
    <
        T = any 
    >(
        keyValuePair: [BaseValueKey, BaseValue<T>]
    ): PocketArgument<T> {
        if (keyValuePair === undefined) {
            throw new Error("Key-value pair is required");
        }

        if (keyValuePair.length !== 2) {
            throw new Error("Key-value pair must contain exactly two elements");
        }

        const [name, value] = keyValuePair;

        return new PocketArgument<T>({
            name,
            value
        });
    }

    /**
     * Creates a PocketArgument from a JSON string.
     * - Expects the JSON string to be in the format { "name": "key", "value": "value" }.
     * 
     * @example
     * const json = '{"name":"arg1","value":"value1"}';
     * const arg = PocketArgument.fromJSON(json);
     * console.log(arg.toString()); // Output: "arg1: value1"
     */
    public static fromJSON
    <
        T = any
    >(
        json: string
    ): PocketArgument<T> {
        let parsed: { name: BaseValueKey; value: BaseValue<T>; configuration?: PocketArgumentConfigurationOptions };
        
        if (Checks.isEmpty(json) == true) {
            throw new Error("JSON string is required");
        }

        try {
            parsed = JSON.parse(json);
        } catch (error) {
            throw new Error("Invalid JSON string");
        }

        const name = parsed.name;
        const value = parsed.value;
        const configuration = parsed.configuration;

        return new PocketArgument<T>({
            name,
            value,
            configuration
        });
    }

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
    public static fromObject
    <
        T = any
    >(
        obj: {
            name: BaseValueKey;
            value: BaseValue<T>;
        }
    ): PocketArgument<T> {
        if (obj === undefined) {
            throw new Error("Object is required");
        }

        if (obj.name === undefined) {
            throw new Error("Name is required");
        }

        if (obj.value === undefined) {
            throw new Error("Value is required");
        }

        return new PocketArgument<T>({
            name: obj.name,
            value: obj.value
        });
    }


    /**
     * Returns a JSON string representation of the PocketArgument object.
     * @example
     * const arg = new PocketArgument({
     *    name: "arg1",
     *    value: "value1"
     * });
     * console.log(arg.toJSON()); // Output: '{"name":"arg1","value":"value1"}'
     */
    public toJSON(): string {
        return JSON.stringify({
            name: this.name,
            value: this.value
        });
    }

    /**
     * Returns a string representation of the PocketArgument object.
     * @example
     * const arg = new PocketArgument({
     *    name: "arg1",
     *    value: "value1"
     * });
     * console.log(arg.toString()); // Output: "arg1: value1"
     */
    public toString(): string {
        return `${String(this.name)}: ${this.value}`;
    }

    /**
     * Returns an object representation of the PocketArgument object.
     * @example
     * const arg = new PocketArgument({
     *   name: "arg1",
     *   value: "value1"
     * });
     * console.log(arg.toObject()); // Output: { name: "arg1", value: "value1" }
     */
    public toObject(): {
        name: BaseValueKey;
        value: BaseValue<T>;
    } {
        return {
            name: this.name,
            value: this.value
        };
    }

    /**
     * Returns a record representation of the PocketArgument object.
     * @example
     * const arg = new PocketArgument({
     *   name: "arg1",
     *   value: "value1"
     * });
     * console.log(arg.toRecord()); // Output: { arg1: "value1" }
     */
    public toRecord(): Record<BaseValueKey, BaseValue<T>> {
        return {
            [this.name]: this.value
        };
    }

    /**
     * Returns a key-value pair representation of the PocketArgument object.
     * @example
     * const arg = new PocketArgument({
     *   name: "arg1",
     *   value: "value1"
     * });
     * console.log(arg.toKeyValuePair()); // Output: ["arg1", "value1"]
     */
    public toKeyValuePair(): [BaseValueKey, BaseValue<T>] {
        return [this.name, this.value];
    }


}

export {
    PocketArgument,
    type PocketArgumentEntry,
    type PocketArgumentConfigurationOptions
}