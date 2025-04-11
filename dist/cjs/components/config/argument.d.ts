import { PocketObject } from "../base/object";
import { BaseArgument, BaseArgumentEntry } from "../../templates/v0/base/configuration";
import { BaseIdentifier, BaseIdentifierType, BaseIdentifierTypes } from "../../templates/v0/base/identifier";
import { BaseMetadataEntry } from "../../templates/v0/base/metadata";
import { BaseObjectTypes } from "../../templates/v0/base/object";
import { BaseValue, BaseValueKey } from "../../templates/v0/base/value";
/**
 * Argument is a generic class that represents an argument object.
 * It extends the PocketObject class and implements the BaseArgument interface.
 *
 * @template V - The type of the value associated with the argument.
 * @template I - The type of the identifier associated with the argument.
 *
 * @extends PocketObject
 * @implements BaseArgument
 *
 * @example
 * const arg = new Argument({
 *     name: "arg1",
 *     value: "value1"
 * });
 */
declare class Argument<V, I extends BaseIdentifierType = BaseIdentifierTypes.Undefined> extends PocketObject<BaseArgumentEntry<V>, I, BaseObjectTypes.Argument> implements BaseArgument<V, I> {
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
    toJSON(): {
        name: BaseValueKey;
        value: BaseValue<V>;
    };
    toKeyValuePair(): Array<[BaseValueKey, BaseValue<V>]>;
    toRecord(): Record<BaseValueKey, BaseValue<V>>;
    toHashedIdentifier(): Promise<BaseIdentifier<BaseIdentifierTypes.Multihash>>;
}
export { Argument };
//# sourceMappingURL=argument.d.ts.map