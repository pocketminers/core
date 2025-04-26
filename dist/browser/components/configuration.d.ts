import { PocketArgument } from "./argument";
import { PocketParameter } from "./parameter";
import { BaseValue, BaseValueKey } from "@templates/v0/base/value";
import { BaseConfiguration } from "@templates/v0";
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
     * @param arguments_ - The arguments for the configuration.
     * @param parameters_ - The parameters for the configuration.
     */
    constructor({ args, params }?: {
        args?: Array<PocketArgument<T>>;
        params?: Array<PocketParameter<T>>;
    });
    static getNameOrKey({ param }: {
        param: PocketParameter;
    }): BaseValueKey;
    static getRequiredParameters({ params }: {
        params: Array<PocketParameter>;
    }): Array<PocketParameter>;
    static getOptionalParameters({ params }: {
        params: Array<PocketParameter>;
    }): Array<PocketParameter>;
    static getDefaultRequiredParameterValues({ params }: {
        params: Array<PocketParameter>;
    }): Array<PocketArgument>;
    static getRequiredArguments({ args, params }: {
        args: Array<PocketArgument>;
        params: Array<PocketParameter>;
    }): Array<PocketArgument>;
    static getArgRecords({ args, params, allowAdditionalArgs }: {
        args: Array<PocketArgument>;
        params: Array<PocketParameter>;
        allowAdditionalArgs?: boolean;
    }): Array<Record<BaseValueKey, BaseValue>>;
}
export { PocketConfiguration };
//# sourceMappingURL=configuration.d.ts.map