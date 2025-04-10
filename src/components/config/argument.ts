import { PocketObject } from "@components/base/object";
import { Metadata } from "@components/metadata";
import { BaseArgument } from "@templates/v0/base/configuration";
import { BaseIdentifier, BaseIdentifierType, BaseIdentifierTypes } from "@templates/v0/base/identifier";
import { BaseMetadataEntry } from "@templates/v0/base/metadata";
import { BaseObjectTypes } from "@templates/v0/base/object";
import { BaseValue, BaseValueKey } from "@templates/v0/base/value";
import { MultiHashUtilities } from "@utilities/multiHash";

/**
 * Argument is a generic class that represents a key-value pair.
 * 
 */
class Argument
<
    V,
    I extends BaseIdentifierType = BaseIdentifierTypes.Undefined,
>
    extends
        PocketObject<
            {
                name: BaseValueKey;
                value: BaseValue<V>;
            },
            I,
            BaseObjectTypes.Argument
        >
    implements
        BaseArgument<V, I>
    
    
{
    /**
     * Constructor for the Argument class.
     */
    constructor({
        name,
        value,
        meta
    }: {
        name: BaseValueKey,
        value: BaseValue<V>,
        meta?: BaseMetadataEntry<I, BaseObjectTypes.Argument>
    }){
        const data = {
            name,
            value
        };

        const metadata = meta !== undefined ? new Metadata<I, BaseObjectTypes.Argument>(meta) : new Metadata<I, BaseObjectTypes.Argument>();
        super(data, metadata);
    }

    /**
     * The name of the argument.
     */
    public get name(): BaseValueKey {
        return this.data.name;
    }

    /**
     * The value of the argument.
     */
    public get value(): BaseValue<V> {
        return this.data.value;
    }

    public toString(): string {
        const name = String(this.name);
        const value = this.value !== undefined ? JSON.stringify(this.value).replaceAll(/\"/g, '"') : "undefined"; // Convert value to string, handle undefined
        return `${name}: ${value}`;
    }

    public toJsonString(): string {
        return JSON.stringify(this.data).replaceAll(/\"/g, '"'); // Serialize with proper JSON format, including quotation marks
    }

    public toKeyValuePair(): Array<[BaseValueKey, BaseValue<V>]> {
        return [[this.name, this.value]];
    }

    public toRecord(): Record<BaseValueKey, BaseValue<V>> {
        return {
            [this.name]: this.value
        };
    }

    public async toHashedIdentifier (): Promise<BaseIdentifier<BaseIdentifierTypes.Multihash>> {
        const hash = await MultiHashUtilities.generateIdentifier(this.toString());
        return {
            type_: BaseIdentifierTypes.Multihash,
            value: hash.value
        };
    }

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
    Argument
}