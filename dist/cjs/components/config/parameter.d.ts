import { PocketObject } from "../base/index.js";
import { BaseIdentifierFormat, BaseIdentifierFormats, BaseMetadataEntry, BaseObjectTypes, BaseParameter, BaseParameterEntry } from "../../templates/v0/index.js";
import { BaseValue, BaseValueKey, StringOrEmpty } from "../../templates/v0/base/value.js";
import { Argument } from "./argument.js";
/**
 * BaseParameterEntry is a generic type that represents a parameter entry object.
 */
interface ParameterEntry<V, I extends BaseIdentifierFormat = BaseIdentifierFormats.Undefined> extends BaseParameterEntry<V>, Partial<Record<'meta', BaseMetadataEntry<I, BaseObjectTypes.Parameter>>> {
}
/**
 * Parameter is a generic class that represents a parameter object.
 * It extends the PocketObject class and implements the BaseParameter interface.
 */
declare class Parameter<V, I extends BaseIdentifierFormat = BaseIdentifierFormats.Undefined> extends PocketObject<BaseParameterEntry<V>, I, BaseObjectTypes.Parameter> implements BaseParameter<V, I> {
    constructor({ name, description, default: defaultValue, required, optional, meta }: ParameterEntry<V, I>);
    get name(): BaseValueKey;
    get description(): StringOrEmpty;
    get default(): BaseValue<V> | undefined;
    get required(): boolean | undefined;
    get optional(): Array<BaseValue<V>> | undefined;
    toString(): string;
    toJSON(): string;
    toArgDefault(): Argument<V | undefined, I>;
}
export { type ParameterEntry, Parameter };
//# sourceMappingURL=parameter.d.ts.map