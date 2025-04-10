import { PocketObject } from "../base/object";
import { BaseArgument } from "../../templates/v0/base/configuration";
import { BaseIdentifier, BaseIdentifierType, BaseIdentifierTypes } from "../../templates/v0/base/identifier";
import { BaseMetadataEntry } from "../../templates/v0/base/metadata";
import { BaseObjectTypes } from "../../templates/v0/base/object";
import { BaseValue, BaseValueKey } from "../../templates/v0/base/value";
/**
 * Argument is a generic class that represents a key-value pair.
 *
 */
declare class Argument<V, I extends BaseIdentifierType = BaseIdentifierTypes.Undefined> extends PocketObject<{
    name: BaseValueKey;
    value: BaseValue<V>;
}, I, BaseObjectTypes.Argument> implements BaseArgument<V, I> {
    /**
     * Constructor for the Argument class.
     */
    constructor({ name, value, meta }: {
        name: BaseValueKey;
        value: BaseValue<V>;
        meta?: BaseMetadataEntry<I, BaseObjectTypes.Argument>;
    });
    /**
     * The name of the argument.
     */
    get name(): BaseValueKey;
    /**
     * The value of the argument.
     */
    get value(): BaseValue<V>;
    toString(): string;
    toJsonString(): string;
    toKeyValuePair(): Array<[BaseValueKey, BaseValue<V>]>;
    toRecord(): Record<BaseValueKey, BaseValue<V>>;
    toHashedIdentifier(): Promise<BaseIdentifier<BaseIdentifierTypes.Multihash>>;
    static fromRecord<V>(record: Record<BaseValueKey, BaseValue<V>>, meta?: BaseMetadataEntry<BaseIdentifierTypes.Undefined, BaseObjectTypes.Argument>): Argument<V, BaseIdentifierTypes.Undefined>;
    static fromKeyValuePair<V>(keyValuePair: [BaseValueKey, BaseValue<V>], meta?: BaseMetadataEntry<BaseIdentifierTypes.Undefined, BaseObjectTypes.Argument>): Argument<V, BaseIdentifierTypes.Undefined>;
    static fromString<V, I extends BaseIdentifierType = BaseIdentifierTypes.Undefined>(str: string, meta?: BaseMetadataEntry<I, BaseObjectTypes.Argument>): Argument<V, I>;
}
export { Argument };
//# sourceMappingURL=argument.d.ts.map