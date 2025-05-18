import { PocketArgument } from "../base/argument.js";
import { PocketParameter } from "../base/parameter.js";
import { BaseValue, BaseValueKey } from "../../templates/v0/base/value.js";
import { BaseConfiguration } from "../../templates/v0/index.js";
import { Immuteable, ImmuteableConfigurationOptions } from "../base/index.js";
/**
 * PocketConfigurationOptions is a type that represents the options for the PocketConfiguration class.
 */
interface PocketConfigurationOptions extends ImmuteableConfigurationOptions, Record<'allowDuplicateArgs', boolean> {
}
/**
 * PocketConfigurationEntry is a type that represents the entry for the PocketConfiguration class.
 */
interface PocketConfigurationEntry<T = any[]> extends Partial<Record<'args', Array<PocketArgument<T>>>>, Partial<Record<'params', Array<PocketParameter<T>>>>, Partial<Record<'configuration', PocketConfigurationOptions>> {
}
/**
 * PocketConfiguration is a generic type that represents a configuration object.
 */
declare class PocketConfiguration<
/**
 * The type of the arguments and parameters for the configuration.
 */
T = any> extends Immuteable implements BaseConfiguration<T> {
    /**
     * The arguments for the configuration.
     */
    arguments: Array<PocketArgument<T>>;
    /**
     * The parameters for the configuration.
     */
    parameters: Array<PocketParameter<T>>;
    /**
     * The constructor for the PocketConfiguration class.
     *
     * @param args - The arguments for the configuration.
     * @param params - The parameters for the configuration.
     * @param configuration - The configuration options for the PocketConfiguration class.
     */
    constructor({ args, params, configuration: { freeze, allowDuplicateArgs } }?: PocketConfigurationEntry<T>);
    /**
     * Checks an array of arguments for duplicates.
     * - if duplicates are found and allowDuplicates is false, an error is thrown.
     * - if duplicates are found and allowDuplicates is true, the function returns true.
     */
    static checkForDuplicateArguments({ args, allowDuplicateArgs }: {
        args?: Array<PocketArgument>;
        allowDuplicateArgs?: boolean;
    }): boolean;
    /**
     * Checks an array of parameters for duplicates.
     * - if duplicates are found and allowDuplicates is false, an error is thrown.
     * - if duplicates are found and allowDuplicates is true, the function returns true.
     */
    static checkForDuplicateParameters({ params, allowDuplicateParams }: {
        params?: Array<PocketParameter>;
        allowDuplicateParams?: boolean;
    }): boolean;
    /**
     * Checks if a parameter is valid.
     * - If the parameter is undefined, an error is thrown.
     * - If the parameter does not have a name, an error is thrown.
     * - If the parameter is valid, true is returned.
     */
    static checkIfParameterIsValid({ params, param }: {
        params: Array<PocketParameter>;
        param: PocketParameter;
    }): boolean;
    /**
     * Returns the name or key of a parameter.
     * - If the parameter has a key, it is returned.
     * - If the parameter does not have a key, the name is returned.
     * - If neither is available, an error is thrown.
     */
    static getParameterNameOrKey(param: PocketParameter, toString?: boolean): BaseValueKey;
    /**
     * Adds a parameter to the configuration.
     * - If the Configuration is frozen, a new PocketConfiguration object is returned.
     */
    addParameter(param: PocketParameter<T>): PocketConfiguration;
    /**
     * Get an array of paramaters that are required.
     */
    static getRequiredParameters({ params }: {
        params: Array<PocketParameter>;
    }): Array<PocketParameter>;
    /**
     * Get an array of paramaters that are not required.
     */
    static getOptionalParameters({ params }: {
        params: Array<PocketParameter>;
    }): Array<PocketParameter>;
    /**
     * Get an array of arguments from an array of parameters.
     * - The arguments are created from the default values of the parameters.
     * - The arguments are created with the name or key of the parameter (key takes precendence).
     */
    static getDefaultParameterValuesAsArguments({ params, allowNonRequired }: {
        params: Array<PocketParameter>;
        allowNonRequired?: boolean;
    }): Array<PocketArgument>;
    /**
     * Get an argument by name from an array of arguments.
     */
    static getArgumentFromArray({ args, name }: {
        args?: Array<PocketArgument>;
        name: BaseValueKey;
    }): PocketArgument[] | undefined;
    /**
     * Check if the argument value is valid according to the parameter.
     * - This involves checking if the value is included in the default or optional values.
     * - If the value is not valid, an error is thrown if throwError is true.
     * - If the value is valid, true is returned.
     * - If the value is not valid and throwError is false, false is returned.
     */
    static checkIfArgumentValueIsValidOrDefault({ arg, param, throwError }: {
        arg: PocketArgument;
        param: PocketParameter;
        throwError?: boolean;
    }): boolean;
    /**
     * Returns the required arguments from a set of PocketParameters and PocketArguments.
     */
    static getRequiredAndSetArguments({ args, params, includeAdditionalArgs }: {
        args?: Array<PocketArgument>;
        params?: Array<PocketParameter>;
        includeAdditionalArgs?: boolean;
        includeNonRequiredArgs?: boolean;
    }): Array<PocketArgument>;
    preparedArgs({ allowAdditionalArgs, allowNonRequired }?: {
        allowAdditionalArgs?: boolean;
        allowNonRequired?: boolean;
    }): Record<BaseValueKey, BaseValue>;
    getPreparedArgByName<T extends BaseValue = any>(key: BaseValueKey): PocketArgument<T> | undefined;
}
export { PocketConfiguration, type PocketConfigurationEntry, type PocketConfigurationOptions };
//# sourceMappingURL=configuration.d.ts.map