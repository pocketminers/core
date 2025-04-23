import { BaseParameterEntry, BaseValue, BaseValueKey } from "../templates/v0/index.js";
declare class PocketParameter<T = any> implements BaseParameterEntry<T> {
    readonly name: BaseValueKey;
    readonly description: string;
    readonly default?: BaseValue<T>;
    readonly required: boolean;
    readonly options: BaseValue<T>[];
    constructor({ name, description, default: defaultValue, required, options }: {
        name: BaseValueKey;
        description?: string;
        default?: BaseValue<T>;
        required?: boolean;
        options?: BaseValue<T>[];
    });
    get nameString(): string;
    checkValue(value: BaseValue<T> | undefined): boolean;
    getValueOrDefault(value: BaseValue<T> | undefined): BaseValue<T> | undefined;
    getValueOrDefaultOrOptions(value: BaseValue<T> | undefined): BaseValue<T> | undefined;
}
export { PocketParameter };
//# sourceMappingURL=parameter.d.ts.map