import { BaseValue, BaseValueKey } from "../../templates/v0/index.js";
interface ConfigurableOptions extends Record<BaseValueKey, BaseValue<any>> {
}
declare class Configurable {
    static readonly defaultOptions: ConfigurableOptions;
    private configuration;
    constructor(configuration?: ConfigurableOptions, prototype?: any);
    initializeConfigurable(overridePrototype?: any): void;
    addOption(key: BaseValueKey, value: BaseValue<any>): Configurable;
    getOption(key: BaseValueKey): BaseValue<any>;
    getOptions(): ConfigurableOptions;
    setOptions(options: ConfigurableOptions): Configurable;
    removeOption(key: BaseValueKey): Configurable;
    hasOption(key: BaseValueKey): boolean;
    clearOptions(): Configurable;
    isEmpty(): boolean;
    toJSON(): string;
    toString(): string;
    static fromJSON(json: string): Configurable;
    static fromString(str: string): Configurable;
    static fromRecords(records: Record<string, BaseValue<any>>[]): Configurable;
}
export { type ConfigurableOptions, Configurable };
//# sourceMappingURL=configurable.d.ts.map