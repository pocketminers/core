import { BaseIdentifierFormat, BaseIdentifierFormats } from "../../templates/v0/base/identifier.js";
import { BaseMetadataEntry } from "../../templates/v0/base/metadata.js";
import { BaseObjectTypes } from "../../templates/v0/base/object.js";
import { BaseValue, BaseValueKey } from "../../templates/v0/base/value.js";
import { Parameter } from "../config/parameter.js";
import { PocketFactory } from "../base/factory.js";
import { BaseParameterEntry } from "../../templates/v0/index.js";
declare class ParameterFactory extends PocketFactory<Parameter<any, any>, BaseObjectTypes.Parameter> {
    private static checkParameterEntry;
    static fromRecord<V, I extends BaseIdentifierFormat = BaseIdentifierFormats.Undefined>(entry: BaseParameterEntry<V>, meta?: BaseMetadataEntry<I, BaseObjectTypes.Parameter>): Parameter<V, I>;
    static create<V>({ name, description, default: defaultValue, required, optional, meta }: {
        name: BaseValueKey;
        description?: string;
        default?: BaseValue<V>;
        required?: boolean;
        optional?: Array<BaseValue<V>>;
        meta?: BaseMetadataEntry<any, BaseObjectTypes.Parameter>;
    }): Parameter<V, BaseIdentifierFormats.Undefined>;
}
export { ParameterFactory };
//# sourceMappingURL=parameter.factory.d.ts.map