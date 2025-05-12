import { PocketArgument } from "./argument";
import { PocketParameter } from "./parameter";
import { BaseValue, BaseValueKey } from "@templates/v0/base/value";
import { BaseConfiguration } from "@templates/v0";
import { PocketMessage } from "./message";
/**
 * PocketConfigurationOptions is a type that represents the options for the PocketConfiguration class.
 */
interface PocketConfigurationOptions extends Partial<Record<'freeze', boolean>>, Partial<Record<'allowDuplicateArgs', boolean>> {
}
/**
 * PocketConfigurationEntry is a type that represents the entry for the PocketConfiguration class.
 */
interface PocketConfigurationEntry<T = any[]> extends Partial<Record<'args', Array<PocketArgument<T>>>>, Partial<Record<'params', Array<PocketParameter<T>>>>, Partial<Record<'options', PocketConfigurationOptions>> {
}
/**
 * PocketConfiguration is a generic type that represents a configuration object.
 */
declare class PocketConfiguration<T = any> implements BaseConfiguration<T> {
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
     */
    constructor({ args, params, options: { freeze, allowDuplicateArgs } }?: PocketConfigurationEntry<T>);
    static checkArgsForDuplicates({ args, allowDuplicateArgs }: {
        args?: Array<PocketArgument>;
        allowDuplicateArgs?: boolean;
    }): boolean;
    static checkParamsForDuplicates({ params }: {
        params?: Array<PocketParameter>;
    }): boolean;
    static checkIfParameterIsValid({ params, param }: {
        params: Array<PocketParameter>;
        param: PocketParameter;
    }): boolean;
    /**
     * Returns the name or key of a parameter.
     * - If the parameter has a key, it is returned.
     * - If the parameter does not have a key, the name is returned.
     * - If neither is available, an error is thrown.
     *
     * @param param - The parameter to get the name or key from.
     * @returns The name or key of the parameter.
     */
    static getParameterNameOrKey(param: PocketParameter, toString?: boolean): BaseValueKey;
    addParameter(param: PocketParameter<T>): PocketMessage;
    static getRequiredParameters({ params }: {
        params: Array<PocketParameter>;
    }): Array<PocketParameter>;
    static getOptionalParameters({ params }: {
        params: Array<PocketParameter>;
    }): Array<PocketParameter>;
    static getDefaultRequiredParameterValues({ params }: {
        params: Array<PocketParameter>;
    }): Array<PocketArgument>;
    static getArgumentFromArray({ args, name }: {
        args?: Array<PocketArgument>;
        name: BaseValueKey;
    }): PocketArgument | undefined;
    static checkIfArgumentValueIsValidOrDefault({ arg, param, throwError }: {
        arg: PocketArgument;
        param: PocketParameter;
        throwError?: boolean;
    }): boolean;
    /**
     * Returns the required arguments from a set of PocketParameters.
     *
     * @param args - The arguments for the configuration.
     * @param params - The parameters for the configuration.
     * @returns The required arguments from the set of PocketParameters.
     */
    static getRequiredArguments({ args, params }: {
        args?: Array<PocketArgument>;
        params: Array<PocketParameter>;
    }): Array<PocketArgument>;
    static getArgRecords({ args, params, allowAdditionalArgs, allowNonRequired }: {
        args?: Array<PocketArgument>;
        params: Array<PocketParameter>;
        allowAdditionalArgs?: boolean;
        allowNonRequired?: boolean;
    }): Array<Record<BaseValueKey, BaseValue>>;
    preparedArgs({ allowAdditionalArgs, allowNonRequired }?: {
        allowAdditionalArgs?: boolean;
        allowNonRequired?: boolean;
    }): Record<BaseValueKey, BaseValue>;
    getPreparedArgByName<T extends BaseValue = any>(key: BaseValueKey): PocketArgument<T> | undefined;
}
export { PocketConfiguration };
//# sourceMappingURL=configuration.d.ts.map