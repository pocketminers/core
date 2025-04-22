import { PocketObject } from "@components/base";
import { Metadata } from "@components/base/metadata";
import { BaseIdentifier, BaseIdentifierType, BaseIdentifierTypes, BaseMetadataEntry, BaseObjectType, BaseObjectTypes, BaseParameter, BaseParameterEntry } from "@templates/v0";
import { BaseValue, BaseValueKey, StringOrEmpty } from "@templates/v0/base/value";
import { Argument } from "./argument";


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
        description ,
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
            : Metadata.createDefaultMetadata<I, BaseObjectTypes.Parameter>({type: BaseObjectTypes.Parameter});
        super({data, metadata});
    }

    public get name(): BaseValueKey {
        return this.data.name;
    }

    public get description(): StringOrEmpty {
        return this.data.description;
    }

    public get default(): BaseValue<V> | undefined {
        return this.data.default;
    }

    public get required(): boolean | undefined {
        return this.data.required;
    }

    public get optional(): Array<BaseValue<V>> | undefined {
        return this.data.optional;
    }

    public toString(): string {
        return `${this.dataString}`
    }

    public toJSON(): string {
        return JSON.stringify(this);
    }

    public toArgDefault(): Argument<V | undefined, I> {
        const metadata = this.metadata as unknown as Metadata<I, BaseObjectTypes.Argument>;

        return new Argument<V | undefined,I>({
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