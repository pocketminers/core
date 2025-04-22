import { BaseArgumentEntry, BaseValue, BaseValueKey } from "@templates/v0";
import { Checks } from "@utilities/checks";
import { Freezer } from "@utilities/freezer";

class PocketArgument
<
    T = any,
>
    implements
        BaseArgumentEntry<T>
{
    public readonly name: BaseValueKey;
    public readonly value: BaseValue<T>;

    constructor({
        name,
        value
    }: {
        name: BaseValueKey;
        value: BaseValue<T>;
    }) {
        if (Checks.isEmpty(name) == true) {
            throw new Error("Name is required");
        }

        if (Checks.isEmpty(value) == true) {
            throw new Error("Value is required");
        }

        this.name = name;
        this.value = value;

        Freezer.deepFreeze(this);
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
        if (!str) {
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

            // If the string is not valid JSON, try to parse it as a key-value pair



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

    public static fromJSON
    <
        T = any
    >(
        json: string
    ): PocketArgument<T> {
        let parsed: { name: BaseValueKey; value: BaseValue<T> };
        
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

        return new PocketArgument<T>({
            name,
            value
        });
    }

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

    public toJSON(): string {
        return JSON.stringify({
            name: this.name,
            value: this.value
        });
    }

    public toString(): string {
        return `${String(this.name)}: ${this.value}`;
    }

    public toObject(): {
        name: BaseValueKey;
        value: BaseValue<T>;
    } {
        return {
            name: this.name,
            value: this.value
        };
    }

    public toRecord(): Record<BaseValueKey, BaseValue<T>> {
        return {
            [this.name]: this.value
        };
    }

    public toKeyValuePair(): [BaseValueKey, BaseValue<T>] {
        return [this.name, this.value];
    }


}

export {
    PocketArgument
}