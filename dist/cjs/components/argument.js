"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocketArgument = void 0;
const checks_1 = require("../utilities/checks.js");
const freezer_1 = require("../utilities/freezer.js");
/**
 * PocketArgument is a class that represents a key-value pair.
 * - It is used to encapsulate arguments in the Pocket framework.
 * - The class is generic and can be used with different types of values.
 * - This class does not extend the PocketObject class, as it does not include a metadata object.
 * - This class is designed to be immutable after creation.
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
class PocketArgument {
    name;
    value;
    /**
     * The constructor initializes the name and value properties with the provided arguments.
     * If the name or value is empty, it throws an error.
     *
     * @param name - The name of the argument.
     * @param value - The value of the argument.
     */
    constructor({ name, value }) {
        if (checks_1.Checks.isEmpty(name) == true) {
            throw new Error("Name is required");
        }
        if (checks_1.Checks.isEmpty(value) == true) {
            throw new Error("Value is required");
        }
        this.name = name;
        this.value = value;
        freezer_1.Freezer.deepFreeze(this);
    }
    get nameString() {
        return String(this.name);
    }
    /**
     * Creates a PocketArgument from a string.
     * Expects the string to be in the format "name=value", "name:value", or JSON.
     */
    static fromString(str) {
        if (!str) {
            throw new Error("String is required");
        }
        let parsed;
        try {
            if (str.startsWith("{")
                && str.endsWith("}")) {
                // Check if the string is in JSON format
                parsed = JSON.parse(str);
            }
            else if (str.includes("=")) {
                // If the string contains "=", split it into key-value pair
                const [name, value] = str.split("=").map(part => part.trim());
                parsed = {
                    name,
                    value: value
                };
            }
            else if (str.includes(":")) {
                // If the string contains ":", split it into key-value pair
                const [name, value] = str.split(":").map(part => part.trim());
                parsed = {
                    name,
                    value: value
                };
            }
            else {
                throw new Error("Invalid string format");
            }
        }
        catch (error) {
            throw new Error("Invalid string format for deserialization " + error.message);
        }
        if (parsed.name === undefined || parsed.name === null) {
            throw new Error("Name is required in the serialized string");
        }
        if (parsed.value === undefined) {
            throw new Error("Value is required in the serialized string");
        }
        return new PocketArgument({
            name: parsed.name,
            value: parsed.value
        });
    }
    /**
     * Creates a PocketArgument from a record.
     * Expects the record to contain only one key-value pair.
     */
    static fromRecord(record) {
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
        return new PocketArgument({
            name,
            value
        });
    }
    /**
     * Creates a PocketArgument from a key-value pair.
     * Expects the key-value pair to be an array of two elements.
     */
    static fromKeyValuePair(keyValuePair) {
        if (keyValuePair === undefined) {
            throw new Error("Key-value pair is required");
        }
        if (keyValuePair.length !== 2) {
            throw new Error("Key-value pair must contain exactly two elements");
        }
        const [name, value] = keyValuePair;
        return new PocketArgument({
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
    static fromJSON(json) {
        let parsed;
        if (checks_1.Checks.isEmpty(json) == true) {
            throw new Error("JSON string is required");
        }
        try {
            parsed = JSON.parse(json);
        }
        catch (error) {
            throw new Error("Invalid JSON string");
        }
        const name = parsed.name;
        const value = parsed.value;
        return new PocketArgument({
            name,
            value
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
    static fromObject(obj) {
        if (obj === undefined) {
            throw new Error("Object is required");
        }
        if (obj.name === undefined) {
            throw new Error("Name is required");
        }
        if (obj.value === undefined) {
            throw new Error("Value is required");
        }
        return new PocketArgument({
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
    toJSON() {
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
    toString() {
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
    toObject() {
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
    toRecord() {
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
    toKeyValuePair() {
        return [this.name, this.value];
    }
}
exports.PocketArgument = PocketArgument;
//# sourceMappingURL=argument.js.map