import { PocketObject } from "../base";
import { BaseIdentifierType, BaseIdentifierTypes, BaseMetadataEntry, BaseObjectTypes, BaseParameter } from "../../templates/v0";
import { BaseValue, BaseValueKey } from "../../templates/v0/base/value";
declare class Parameter<V, I extends BaseIdentifierType = BaseIdentifierTypes.Undefined> extends PocketObject<{
    name: BaseValueKey;
    description: string;
    default: BaseValue<V>;
    required: boolean;
    optional: Array<BaseValue<V>>;
}, I, BaseObjectTypes.Parameter> implements BaseParameter<V, I> {
    constructor({ name, description, default: defaultValue, required, optional, meta }: {
        name: BaseValueKey;
        description: string;
        default: BaseValue<V>;
        required: boolean;
        optional: Array<BaseValue<V>>;
        meta?: BaseMetadataEntry<I, BaseObjectTypes.Parameter>;
    });
    get name(): BaseValueKey;
    get description(): string;
    get default(): BaseValue<V>;
    get required(): boolean;
    get optional(): Array<BaseValue<V>>;
    toString(): string;
    toJSON(): string;
}
export { Parameter };
//# sourceMappingURL=parameter.d.ts.map