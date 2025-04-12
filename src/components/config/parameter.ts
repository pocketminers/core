import { PocketObject } from "@components/base";
import { Metadata } from "@components/metadata";
import { MetadataFactory } from "@components/metadata/metadata.factory";
import { BaseIdentifier, BaseIdentifierType, BaseIdentifierTypes, BaseMetadataEntry, BaseObjectType, BaseObjectTypes, BaseParameter, BaseParameterEntry } from "@templates/v0";
import { BaseValue, BaseValueKey, StringOrEmpty } from "@templates/v0/base/value";
import { Argument } from "./argument";
import { MultiHashUtilities } from "@utilities/multiHash";


/**
 * BaseParameterEntry is a generic type that represents a parameter entry object.
 */
interface ParameterEntry
<
    V,
    I extends BaseIdentifierType = BaseIdentifierTypes.Undefined
> extends
    BaseParameterEntry<V>,
    Partial<Record<'meta', BaseMetadataEntry<I, BaseObjectTypes.Parameter>>>
{}


/**
 * Parameter is a generic class that represents a parameter object.
 * It extends the PocketObject class and implements the BaseParameter interface.
 */
class Parameter
<
    V,
    I extends BaseIdentifierType = BaseIdentifierTypes.Undefined
> 
    extends
        PocketObject<
            BaseParameterEntry<V>,
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
    }: ParameterEntry<V, I>) {
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

        const metadata = meta !== undefined 
            ? new Metadata<I, BaseObjectTypes.Parameter>({...meta, type: BaseObjectTypes.Parameter})
            : MetadataFactory.createDefaultMetadata<I, BaseObjectTypes.Parameter>({type: BaseObjectTypes.Parameter});
        super({data, metadata});
    }

    public get name(): BaseValueKey {
        return this.data.name;
    }

    public get description(): StringOrEmpty {
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

    public toArgdefault(): Argument<V, I> {
        const metadata = this.metadata as unknown as Metadata<I, BaseObjectTypes.Argument>;

        return new Argument({
            name: this.name,
            value: this.default,
            meta: {
                ...metadata,
                type: BaseObjectTypes.Argument
            }
        });
    }     
}

export {
    type ParameterEntry,
    Parameter
}