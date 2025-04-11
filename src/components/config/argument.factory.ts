import { BaseIdentifierType, BaseIdentifierTypes } from "@templates/v0/base/identifier";
import { BaseMetadataEntry } from "@templates/v0/base/metadata";
import { BaseObjectTypes } from "@templates/v0/base/object";
import { BaseValue, BaseValueKey } from "@templates/v0/base/value";
import { Argument } from "@components/config/argument";


class ArgumentFactory {

    public static fromRecord
    <
        V
    >(
        record: Record<BaseValueKey, BaseValue<V>>,
        meta?: BaseMetadataEntry<BaseIdentifierTypes.Undefined, BaseObjectTypes.Argument>
    ): Argument<V, BaseIdentifierTypes.Undefined> {
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

        return new Argument<V, BaseIdentifierTypes.Undefined>({
            name,
            value,
            meta
        });
    }

    public static fromKeyValuePair
    <
        V
    >(
        keyValuePair: [BaseValueKey, BaseValue<V>],
        meta?: BaseMetadataEntry<BaseIdentifierTypes.Undefined, BaseObjectTypes.Argument>
    ): Argument<V, BaseIdentifierTypes.Undefined> {
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

        return new Argument<V, BaseIdentifierTypes.Undefined>({
            name,
            value,
            meta
        });
    }

    public static fromString<V, I extends BaseIdentifierType = BaseIdentifierTypes.Undefined>(
        str: string,
        meta?: BaseMetadataEntry<I, BaseObjectTypes.Argument>
    ): Argument<V, I> {
        if (!str) {
            throw new Error("String is required");
        }

        let parsed: { name: BaseValueKey; value: BaseValue<V> };
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
        } catch (error) {
            throw new Error("Invalid string format for deserialization");
        }

        if (parsed.name === undefined || parsed.name === null) {
            throw new Error("Name is required in the serialized string");
        }
        if (parsed.value === undefined) {
            throw new Error("Value is required in the serialized string");
        }

        return new Argument<V, I>({
            name: parsed.name,
            value: parsed.value,
            meta
        });
    }
}

export {
    ArgumentFactory
}