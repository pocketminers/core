import { BaseIdentifierType, BaseIdentifierTypes } from "../../templates/v0/base/identifier";
import { BaseMetadataEntry } from "../../templates/v0/base/metadata";
import { BaseObjectTypes } from "../../templates/v0/base/object";
import { BaseValue, BaseValueKey } from "../../templates/v0/base/value";
import { Argument } from "../config/argument";
declare class ArgumentFactory {
    static fromRecord<V>(record: Record<BaseValueKey, BaseValue<V>>, meta?: BaseMetadataEntry<BaseIdentifierTypes.Undefined, BaseObjectTypes.Argument>): Argument<V, BaseIdentifierTypes.Undefined>;
    static fromKeyValuePair<V>(keyValuePair: [BaseValueKey, BaseValue<V>], meta?: BaseMetadataEntry<BaseIdentifierTypes.Undefined, BaseObjectTypes.Argument>): Argument<V, BaseIdentifierTypes.Undefined>;
    static fromString<V, I extends BaseIdentifierType = BaseIdentifierTypes.Undefined>(str: string, meta?: BaseMetadataEntry<I, BaseObjectTypes.Argument>): Argument<V, I>;
}
export { ArgumentFactory };
//# sourceMappingURL=argument.factory.d.ts.map