import { PocketObject } from "@components/base/object";
import { Metadata } from "@components/metadata";
import { MetadataFactory } from "@components/metadata/metadata.factory";
import { BaseArgument } from "@templates/v0/base/configuration";
import { BaseIdentifier, BaseIdentifierType, BaseIdentifierTypes } from "@templates/v0/base/identifier";
import { BaseMetadataEntry } from "@templates/v0/base/metadata";
import { BaseObjectType, BaseObjectTypes } from "@templates/v0/base/object";
import { BaseValue, BaseValueKey } from "@templates/v0/base/value";
import { MultiHashUtilities } from "@utilities/multiHash";

/**
 * Argument is a generic class that represents a key-value pair.
 * 
 */
class Argument
<
    V,
    I extends BaseIdentifierType = BaseIdentifierTypes.Undefined
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

        if (name === undefined) {
            throw new Error("Name is required");
        }

        const data = {
            name,
            value
        };

        const metadata = meta !== undefined ? new Metadata<I, BaseObjectTypes.Argument>(meta) : MetadataFactory.createDefaultMetadata<I, BaseObjectTypes.Argument>();
        super({data, metadata});
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

    public toJSON(): {
        name: BaseValueKey;
        value: BaseValue<V>;
    } {
        return {
            name: this.name,
            value: this.value
        };
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
}

export {
    Argument
}