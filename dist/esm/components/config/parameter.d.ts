import { PocketObject } from "../base/index.js";
import { BaseIdentifierType, BaseIdentifierTypes, BaseMetadataEntry, BaseObjectTypes, BaseParameter, BaseParameterEntry } from "../../templates/v0/index.js";
import { BaseValue, BaseValueKey, StringOrEmpty } from "../../templates/v0/base/value.js";
/**
 * BaseParameterEntry is a generic type that represents a parameter entry object.
 */
interface ParameterEntry<V, I extends BaseIdentifierType = BaseIdentifierTypes.Undefined> extends BaseParameterEntry<V>, Partial<Record<'meta', BaseMetadataEntry<I, BaseObjectTypes.Parameter>>> {
}
/**
 * Parameter is a generic class that represents a parameter object.
 * It extends the PocketObject class and implements the BaseParameter interface.
 */
declare class Parameter<V, I extends BaseIdentifierType = BaseIdentifierTypes.Undefined> extends PocketObject<BaseParameterEntry<V>, I, BaseObjectTypes.Parameter> implements BaseParameter<V, I> {
    constructor({ name, description, default: defaultValue, required, optional, meta }: ParameterEntry<V, I>);
    get name(): BaseValueKey;
    get description(): StringOrEmpty;
    get default(): BaseValue<V>;
    get required(): boolean;
    get optional(): Array<BaseValue<V>>;
    toString(): string;
    toJSON(): string;
}
export { type ParameterEntry, Parameter };
//# sourceMappingURL=parameter.d.ts.map