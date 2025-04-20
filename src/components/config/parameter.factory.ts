import { BaseIdentifierType, BaseIdentifierTypes } from "@templates/v0/base/identifier";
import { BaseMetadataEntry } from "@templates/v0/base/metadata";
import { BaseObjectTypes } from "@templates/v0/base/object";
import { BaseValue, BaseValueKey } from "@templates/v0/base/value";
import { Parameter } from "@components/config/parameter";
import { PocketFactory } from "@components/base/factory";
import { BaseParameter, BaseParameterEntry } from "@templates/v0";

class ParameterFactory
    extends PocketFactory
    <
        Parameter<any, any>,
        BaseObjectTypes.Parameter
    >
{

    private static checkParameterEntry
    <
        V
    >(
        entry: BaseParameterEntry<V>
    ): BaseParameterEntry<V> {
        if (!entry) {
            throw new Error("Entry is required");
        }

        if (!entry.name) {
            throw new Error("Name is required");
        }

        if (entry.required === undefined) {
            entry.required = false;
        }

        return entry;
    }

    public static fromRecord
    <
        V,
        I extends BaseIdentifierType = BaseIdentifierTypes.Undefined
    >(
        entry: BaseParameterEntry<V>,
        meta?: BaseMetadataEntry<I, BaseObjectTypes.Parameter>
    ): Parameter<V, I> {
        entry = ParameterFactory.checkParameterEntry(entry);

        return new Parameter<V, I>({
            name: entry.name,
            description: entry.description,
            default: entry.default,
            required: entry.required,
            optional: entry.optional,
            meta
        });
    }

    public static create<V>({
        name,
        description,
        default: defaultValue,
        required,
        optional,
        meta
    }: {
        name: BaseValueKey,
        description?: string,
        default?: BaseValue<V>,
        required?: boolean,
        optional?: Array<BaseValue<V>>,
        meta?: BaseMetadataEntry<any, BaseObjectTypes.Parameter>
    }): Parameter<V, BaseIdentifierTypes.Undefined> {
        return ParameterFactory.fromRecord({
            name,
            description,
            default: defaultValue,
            required,
            optional
        }, meta);
    }

}

export {
    ParameterFactory
}