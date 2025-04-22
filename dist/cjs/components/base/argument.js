"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocketArgument = void 0;
const checks_1 = require("../../utilities/checks.js");
const freezer_1 = require("../../utilities/freezer.js");
class PocketArgument {
    name;
    value;
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
    static from(name, value) {
        if (checks_1.Checks.isEmpty(name) == true) {
            throw new Error("Name is required");
        }
        if (checks_1.Checks.isEmpty(value) == true) {
            throw new Error("Value is required");
        }
        return new PocketArgument({
            name,
            value
        });
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
            if (str.startsWith("{") && str.endsWith("}")) {
                // Check if the string is in JSON format
                parsed = JSON.parse(str);
            }
            else if (str.includes("=")) {
                // If the string contains "=", split it into key-value pair
                const [name, value] = str.split("=").map(part => part.trim());
                parsed = {
                    name,
                    value: JSON.parse(value)
                };
            }
            else if (str.includes(":")) {
                // If the string contains ":", split it into key-value pair
                const [name, value] = str.split(":").map(part => part.trim());
                parsed = {
                    name,
                    value: JSON.parse(value)
                };
            }
            else {
                throw new Error("Invalid string format");
            }
        }
        catch (error) {
            throw new Error("Invalid string format for deserialization");
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
    // If the string is not valid JSON, try to parse it as a key-value pair
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
    toJSON() {
        return JSON.stringify({
            name: this.name,
            value: this.value
        });
    }
    toString() {
        return `${String(this.name)}: ${this.value}`;
    }
    toObject() {
        return {
            name: this.name,
            value: this.value
        };
    }
    toRecord() {
        return {
            [this.name]: this.value
        };
    }
    toKeyValuePair() {
        return [this.name, this.value];
    }
}
exports.PocketArgument = PocketArgument;
//# sourceMappingURL=argument.js.map