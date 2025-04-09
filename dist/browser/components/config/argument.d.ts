import { Metadata } from "../metadata";
import { BaseArgument } from "../../templates/v0/base/configuration";
import { BaseIdentifier, BaseIdentifierType, BaseIdentifierTypes } from "../../templates/v0/base/identifier";
import { BaseMetadataEntry } from "../../templates/v0/base/metadata";
import { BaseObjectTypes } from "../../templates/v0/base/object";
import { BaseValue, BaseValueKey } from "../../templates/v0/base/value";
/**
 * Argument is a generic class that represents a key-value pair.
 *
 */
declare class Argument<T, I extends BaseIdentifierType = BaseIdentifierTypes.Undefined> implements BaseArgument<T, I> {
    readonly data: {
        name: BaseValueKey;
        value: BaseValue<T>;
    };
    readonly metadata: Metadata<I, BaseObjectTypes.Argument>;
    constructor({ name, value, meta }: {
        name: BaseValueKey;
        value: BaseValue<T>;
        meta?: BaseMetadataEntry<I, BaseObjectTypes.Argument>;
    });
    get name(): BaseValueKey;
    get value(): BaseValue<T>;
    toString(): string;
    toKeyValuePair(): Array<[BaseValueKey, BaseValue<T>]>;
    toRecord(): Record<BaseValueKey, BaseValue<T>>;
    toHashedIdentifier(): Promise<BaseIdentifier<BaseIdentifierTypes.Multihash>>;
    static fromRecord<T>(record: Record<BaseValueKey, BaseValue<T>>, meta?: BaseMetadataEntry<BaseIdentifierTypes.Undefined, BaseObjectTypes.Argument>): Argument<T, BaseIdentifierTypes.Undefined>;
}
export { Argument };
//# sourceMappingURL=argument.d.ts.map