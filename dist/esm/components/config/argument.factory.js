import { Argument } from "../config/argument";
class ArgumentFactory {
    static fromRecord(record, meta) {
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
        if (name === undefined) {
            throw new Error("Name is required");
        }
        if (value === undefined) {
            throw new Error("Value is required");
        }
        return new Argument({
            name,
            value,
            meta
        });
    }
    static fromKeyValuePair(keyValuePair, meta) {
        if (keyValuePair === undefined) {
            throw new Error("Key-value pair is required");
        }
        if (keyValuePair.length !== 2) {
            throw new Error("Key-value pair must contain exactly two elements");
        }
        const [name, value] = keyValuePair;
        if (name === undefined) {
            throw new Error("Name is required");
        }
        if (value === undefined) {
            throw new Error("Value is required");
        }
        return new Argument({
            name,
            value,
            meta
        });
    }
    static fromString(str, meta) {
        if (!str) {
            throw new Error("String is required");
        }
        let parsed;
        try {
            console.log("Parsing string:", str);
            if (str.includes(":")) {
                const [name, ...value] = str.split(":").map(part => part.trim());
                if (value.length === 0) {
                    throw new Error("Value is required in the serialized string");
                }
                const valueString = value.join(":").trim();
                if (valueString === "") {
                    throw new Error("Value is required in the serialized string");
                }
                parsed = {
                    name,
                    value: JSON.parse(valueString)
                };
            }
            else {
                const [name, value] = str.split("=").map(part => part.trim());
                parsed = {
                    name,
                    value: JSON.parse(value)
                };
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
        return new Argument({
            name: parsed.name,
            value: parsed.value,
            meta
        });
    }
    /**
     * Creates a new Argument instance from JSON.
     */
    static fromJSON(json, meta) {
        if (!json) {
            throw new Error("JSON string is required");
        }
        let parsed;
        try {
            parsed = JSON.parse(json);
        }
        catch (error) {
            throw new Error("Invalid JSON string");
        }
        if (parsed.name === undefined || parsed.name === null) {
            throw new Error("Name is required in the JSON string");
        }
        if (parsed.value === undefined) {
            throw new Error("Value is required in the JSON string");
        }
        return new Argument({
            name: parsed.name,
            value: parsed.value,
            meta
        });
    }
    /**
     * Creates an array of Argument instances.
     * @param args - An array of objects containing name, value, and optional metadata for each argument.
     * @returns An array of Argument instances.
     */
    static fromArray(args) {
        if (!Array.isArray(args) || args.length === 0) {
            throw new Error("An array of arguments is required");
        }
        return args.map(({ name, value, meta }) => {
            if (name === undefined || name === null) {
                throw new Error("Name is required for each argument");
            }
            return new Argument({
                name,
                value,
                meta
            });
        });
    }
    static fromKeyValuePairs(...keyValuePairs) {
        if (!Array.isArray(keyValuePairs) || keyValuePairs.length === 0) {
            throw new Error("An array of key-value pairs is required");
        }
        return keyValuePairs.map(([name, value]) => {
            if (name === undefined || name === null) {
                throw new Error("Name is required for each argument");
            }
            return new Argument({
                name,
                value
            });
        });
    }
}
export { ArgumentFactory };
//# sourceMappingURL=argument.factory.js.map