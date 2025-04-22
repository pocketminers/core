import { BaseIdentifierFormat, BaseIdentifierFormats } from "../../templates/v0/base/identifier.js";
import { BaseMetadataEntry } from "../../templates/v0/base/metadata.js";
import { BaseObjectTypes } from "../../templates/v0/base/object.js";
import { BaseValue, BaseValueKey } from "../../templates/v0/base/value.js";
import { Argument } from "../config/argument.js";
import { PocketFactory } from "../base/factory.js";
declare class ArgumentFactory extends PocketFactory<Argument<any, any>, BaseObjectTypes.Argument> {
    static fromRecord<V, I extends BaseIdentifierFormat = BaseIdentifierFormats.Undefined>(record: Record<BaseValueKey, BaseValue<V>>, meta?: BaseMetadataEntry<I, BaseObjectTypes.Argument>): Argument<V, I>;
    static fromKeyValuePair<V>(keyValuePair: [BaseValueKey, BaseValue<V>], meta?: BaseMetadataEntry<BaseIdentifierFormats.Undefined, BaseObjectTypes.Argument>): Argument<V, BaseIdentifierFormats.Undefined>;
    static fromString<V, I extends BaseIdentifierFormat = BaseIdentifierFormats.Undefined>(str: string, meta?: BaseMetadataEntry<I, BaseObjectTypes.Argument>): Argument<V, I>;
    /**
     * Creates a new Argument instance from JSON.
     */
    static fromJSON<V, I extends BaseIdentifierFormat = BaseIdentifierFormats.Undefined>(json: string, meta?: BaseMetadataEntry<I, BaseObjectTypes.Argument>): Argument<V, I>;
    /**
     * Creates an array of Argument instances.
     * @param args - An array of objects containing name, value, and optional metadata for each argument.
     * @returns An array of Argument instances.
     */
    static fromArray<V, I extends BaseIdentifierFormat = BaseIdentifierFormats.Undefined>(args: {
        name: BaseValueKey;
        value: BaseValue<V>;
        meta?: BaseMetadataEntry<I, BaseObjectTypes.Argument>;
    }[]): Argument<V, I>[];
    static fromKeyValuePairs<V, I extends BaseIdentifierFormat = BaseIdentifierFormats.Undefined>(...keyValuePairs: [BaseValueKey, BaseValue<V>][]): Argument<V, I>[];
    static fromRecords<V, I extends BaseIdentifierFormat = BaseIdentifierFormats.Undefined>(...records: Record<BaseValueKey, BaseValue<V>>[]): Argument<V, I>[];
}
export { ArgumentFactory };
//# sourceMappingURL=argument.factory.d.ts.map