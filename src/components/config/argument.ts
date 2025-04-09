import { Metadata } from "@components/metadata";
import { BaseArgument } from "@templates/v0/base/configuration";
import { BaseIdentifier, BaseIdentifierType, BaseIdentifierTypes } from "@templates/v0/base/identifier";
import { BaseMetadataEntry } from "@templates/v0/base/metadata";
import { BaseObjectTypes } from "@templates/v0/base/object";
import { BaseValue, BaseValueKey } from "@templates/v0/base/value";
import { Freezer } from "@utilities/freezer";
import { MultiHashUtilities } from "@utilities/multiHash";



/**
 * Argument is a generic class that represents a key-value pair.
 * 
 */
class Argument
<
    T,
    I extends BaseIdentifierType = BaseIdentifierTypes.Undefined,
>
    implements
        BaseArgument<T, I>
    
{
    public readonly data: {
        name: BaseValueKey;
        value: BaseValue<T>;
    }

    public readonly metadata: Metadata<I, BaseObjectTypes.Argument>;

    constructor({
        name,
        value,
        meta
    }: {
        name: BaseValueKey,
        value: BaseValue<T>,
        meta?: BaseMetadataEntry<I, BaseObjectTypes.Argument>
    }){
        this.data = {
            name,
            value
        };

        this.metadata = new Metadata<I, BaseObjectTypes.Argument>({
            id: {
                type_: meta?.id?.type_ as I || BaseIdentifierTypes.Undefined,
                value: meta?.id?.value || "undefined"
            },
            ...meta
        });

        Freezer.deepFreeze(this);
    }

    public get name(): BaseValueKey {
        return this.data.name;
    }

    public get value(): BaseValue<T> {
        return this.data.value;
    }

    public toString(): string {
        return `${String(this.name)}: ${this.value instanceof String ? this.value 
            : this.value instanceof Number ? this.value.toString() 
            : this.value instanceof Boolean ? this.value.toString()
            : this.value instanceof Array ? `[${this.value.map(v => v?.toString()).join(", ")}]`
            : this.value instanceof Object ? `{${Object.entries(this.value).map(([k, v]) => `${k}: ${v}`).join(", ")}}`
            : 'undefined'}`;
    }

    public toKeyValuePair(): Array<[BaseValueKey, BaseValue<T>]> {
        return [[this.name, this.value]];
    }

    public toRecord(): Record<BaseValueKey, BaseValue<T>> {
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