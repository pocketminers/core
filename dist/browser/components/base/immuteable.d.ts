import { Configurable, ConfigurableOptions } from "../base/configurable.js";
/**
 * ImmuteableConfigurationOptions is an interface that defines the options for the Immuteable class.
 */
interface ImmuteableConfigurationOptions extends ConfigurableOptions, Record<'freeze', boolean> {
}
/**
 * The Immuteable class is a base class that provides immutability to its instances.
 * - It uses the Freezer utility to deep freeze the object and its properties.
 * - This ensures that the object cannot be modified after it has been created.
 */
declare class Immuteable extends Configurable {
    /**
     * The freeze option determines whether the object should be frozen or not.
     * - If set to true, the object and its properties will be frozen.
     * - If set to false, the object and its properties will not be frozen.
     */
    static readonly defaultOptions: ImmuteableConfigurationOptions;
    constructor(configuration?: ImmuteableConfigurationOptions, prototype?: any);
    initializeImmuteable({ force }?: {
        force?: boolean;
    }): void;
    static deepFreeze<T>(object: T): T;
    static isFrozen<T>(object: T): boolean;
    static thaw<T>(object: T): T;
    gethash({ keys }: {
        keys: string[];
    }): Promise<string>;
}
export { type ImmuteableConfigurationOptions, Immuteable };
//# sourceMappingURL=immuteable.d.ts.map