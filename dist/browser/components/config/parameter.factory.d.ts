import { BaseIdentifierType, BaseIdentifierTypes } from "../../templates/v0/base/identifier.js";
import { BaseMetadataEntry } from "../../templates/v0/base/metadata.js";
import { BaseObjectTypes } from "../../templates/v0/base/object.js";
import { Parameter } from "../config/parameter.js";
import { PocketFactory } from "../base/factory.js";
import { BaseParameterEntry } from "../../templates/v0/index.js";
declare class ParameterFactory extends PocketFactory<Parameter<any, any>, BaseObjectTypes.Parameter> {
    private static checkParameterEntry;
    static fromRecord<V, I extends BaseIdentifierType = BaseIdentifierTypes.Undefined>(entry: BaseParameterEntry<V>, meta?: BaseMetadataEntry<I, BaseObjectTypes.Parameter>): Parameter<V, I>;
}
export { ParameterFactory };
//# sourceMappingURL=parameter.factory.d.ts.map