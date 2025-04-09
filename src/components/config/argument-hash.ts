import { Metadata } from "@components/metadata";
import { BaseArgument } from "@templates/v0/base/configuration";
import { BaseIdentifier, BaseIdentifierTypes } from "@templates/v0/base/identifier";
import { BaseMetadataAnnotations, BaseMetadataEntry, BaseMetadataLabels } from "@templates/v0/base/metadata";
import { BaseObjectTypes } from "@templates/v0/base/object";
import { BaseTimestamps } from "@templates/v0/base/timestamps";
import { BaseValue, BaseValueKey } from "@templates/v0/base/value";
import { Freezer } from "@utilities/freezer";
import { MultiHashUtilities } from "@utilities/multiHash";


type AllowedArgumentBaseIdentifiers = BaseIdentifierTypes.Multihash | BaseIdentifierTypes.Undefined;

/**
 * BaseArgument is a generic class that represents a key-value pair.
 */
class Argument<T>
    implements
        BaseArgument<T>
    
{
    public readonly data: {
        name: BaseValueKey;
        value: BaseValue<T>;
    }

    public metadata: Metadata<AllowedArgumentBaseIdentifiers, BaseObjectTypes.Argument>;

    constructor({
        name,
        value,
        meta
    }: {
        name: BaseValueKey,
        value: BaseValue<T>,
        meta?: BaseMetadataEntry<AllowedArgumentBaseIdentifiers, BaseObjectTypes.Argument>
    }){
        this.data = {
            name,
            value
        };

        this.metadata = new Metadata<AllowedArgumentBaseIdentifiers, BaseObjectTypes.Argument>({
            id: {
                type_: BaseIdentifierTypes.Undefined,
                value: "undefined"
            },
            ...meta
        });

        MultiHashUtilities.generateIdentifier(this.toString())
            .then((identifier: BaseIdentifier<BaseIdentifierTypes.Multihash>) => {
                this.metadata = new Metadata<AllowedArgumentBaseIdentifiers, BaseObjectTypes.Argument>({
                    id: identifier,
                    ...meta
                });
            })
            .catch((error: Error) => {
                console.error("Error generating identifier:", error);
            });

        Freezer.deepFreeze(this.data);
    }

    public get name(): BaseValueKey {
        return this.data.name;
    }

    public get value(): BaseValue<T> {
        return this.data.value;
    }

    toString(): string {
        return `${String(this.name)}: ${this.value instanceof String ? this.value 
            : this.value instanceof Number ? this.value.toString() 
            : this.value instanceof Boolean ? this.value.toString()
            : this.value instanceof Array ? `[${this.value.map(v => v?.toString()).join(", ")}]`
            : this.value instanceof Object ? `{${Object.entries(this.value).map(([k, v]) => `${k}: ${v}`).join(", ")}}`
            : 'undefined'}`;
    }

    toKeyValuePair(): Array<[BaseValueKey, BaseValue<T>]> {
        return [[this.name, this.value]];
    }

    toRecord(): Record<BaseValueKey, BaseValue<T>> {
        return {
            [this.name]: this.value
        };
    }
}


export {
    Argument
}