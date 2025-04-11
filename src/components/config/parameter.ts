import { PocketObject } from "@components/base";
import { Metadata } from "@components/metadata";
import { MetadataFactory } from "@components/metadata/metadata.factory";
import { BaseIdentifierType, BaseIdentifierTypes, BaseMetadataEntry, BaseObjectType, BaseObjectTypes, BaseParameter } from "@templates/v0";
import { BaseValue, BaseValueKey } from "@templates/v0/base/value";

class Parameter
<
    V,
    I extends BaseIdentifierType = BaseIdentifierTypes.Undefined
> 
    extends
        PocketObject<
            {
                name: BaseValueKey;
                description: string;
                default: BaseValue<V>;
                required: boolean;
                optional: Array<BaseValue<V>>;
            },
            I,
            BaseObjectTypes.Parameter
        >
    implements
        BaseParameter<V, I>
{
    constructor({
        name,
        description,
        default: defaultValue,
        required,
        optional,
        meta
    }: {
        name: BaseValueKey,
        description: string,
        default: BaseValue<V>,
        required: boolean,
        optional: Array<BaseValue<V>>,
        meta?: BaseMetadataEntry<I, BaseObjectTypes.Parameter>
    }) {
        if (name === undefined) {
            throw new Error("Name is required");
        }

        const data = {
            name,
            description,
            default: defaultValue,
            required,
            optional
        };

        const metadata = meta !== undefined ? new Metadata<I, BaseObjectTypes.Parameter>(meta) : MetadataFactory.createDefaultMetadata<I, BaseObjectTypes.Parameter>();
        super({data, metadata});
    }

    public get name(): BaseValueKey {
        return this.data.name;
    }

    public get description(): string {
        return this.data.description;
    }

    public get default(): BaseValue<V> {
        return this.data.default;
    }

    public get required(): boolean {
        return this.data.required;
    }

    public get optional(): Array<BaseValue<V>> {
        return this.data.optional;
    }

    public toString(): string {
        return `${this.dataString}`
    }

    public toJSON(): string {
        return JSON.stringify(this);
    }
}

export {
    Parameter
}