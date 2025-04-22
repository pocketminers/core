import { BaseArgumentEntry, BaseValue, BaseValueKey } from "../../templates/v0/index.js";
declare class PocketArgument<T = any> implements BaseArgumentEntry<T> {
    readonly name: BaseValueKey;
    readonly value: BaseValue<T>;
    constructor({ name, value }: {
        name: BaseValueKey;
        value: BaseValue<T>;
    });
    static from<T = any>(name: BaseValueKey, value: BaseValue<T>): PocketArgument<T>;
    /**
     * Creates a PocketArgument from a string.
     * Expects the string to be in the format "name=value", "name:value", or JSON.
     */
    static fromString<T = any>(str: string): PocketArgument<T>;
    static fromRecord<T = any>(record: Record<BaseValueKey, BaseValue<T>>): PocketArgument<T>;
    static fromKeyValuePair<T = any>(keyValuePair: [BaseValueKey, BaseValue<T>]): PocketArgument<T>;
    static fromJSON<T = any>(json: string): PocketArgument<T>;
    static fromObject<T = any>(obj: {
        name: BaseValueKey;
        value: BaseValue<T>;
    }): PocketArgument<T>;
    toJSON(): string;
    toString(): string;
    toObject(): {
        name: BaseValueKey;
        value: BaseValue<T>;
    };
    toRecord(): Record<BaseValueKey, BaseValue<T>>;
    toKeyValuePair(): [BaseValueKey, BaseValue<T>];
}
export { PocketArgument };
//# sourceMappingURL=argument.d.ts.map