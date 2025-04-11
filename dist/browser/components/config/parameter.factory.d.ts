import { BaseIdentifierType, BaseIdentifierTypes } from "../../templates/v0/base/identifier";
import { BaseMetadataEntry } from "../../templates/v0/base/metadata";
import { BaseObjectTypes } from "../../templates/v0/base/object";
import { Parameter } from "../config/parameter";
import { PocketFactory } from "../base/factory";
import { BaseParameterEntry } from "../../templates/v0";
declare class ParameterFactory extends PocketFactory<Parameter<any, any>, BaseObjectTypes.Parameter> {
    private static checkParameterEntry;
    static fromRecord<V, I extends BaseIdentifierType = BaseIdentifierTypes.Undefined>(entry: BaseParameterEntry<V>, meta?: BaseMetadataEntry<I, BaseObjectTypes.Parameter>): Parameter<V, I>;
}
export { ParameterFactory };
//# sourceMappingURL=parameter.factory.d.ts.map