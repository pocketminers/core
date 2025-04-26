import { PocketArgument } from "./argument";
import { PocketParameter } from "./parameter";
import { BaseValue, BaseValueKey } from "@templates/v0/base/value";
import { BaseConfiguration } from "@templates/v0";


/**
 * PocketConfiguration is a generic type that represents a configuration object.
 */
class PocketConfiguration
<
    T = any
>
    implements
        BaseConfiguration<T>
{
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
    public constructor({
        args = [],
        params = []
    }: { 
        args?: Array<PocketArgument<T>>;
        params?: Array<PocketParameter<T>>;
    } = {}) {
        this.arguments = args;
        this.parameters = params;
    }

    public static getNameOrKey({
        param
    }: {
        param: PocketParameter;
    }): BaseValueKey {
        if (param.key) {
            return param.key;
        }
        else if (param.name) {
            return param.name;
        }
        else {
            throw new Error(`Parameter ${param.name} does not have a key or name.`);
        }
    }


    public static getRequiredParameters({
        params
    }: {
        params: Array<PocketParameter>;
    }): Array<PocketParameter> {
        // Check if the arguments and parameters are valid
        const requiredParams = new Array<PocketParameter>();

        for (const param of params) {
            if (param.required) {
                requiredParams.push(param);
            }
        }

        return requiredParams;
    }

    public static getOptionalParameters({
        params
    }: {
        params: Array<PocketParameter>;
    }): Array<PocketParameter> {
        // Check if the arguments and parameters are valid
        const optionalParams = new Array<PocketParameter>();

        for (const param of params) {
            if (!param.required) {
                optionalParams.push(param);
            }
        }

        return optionalParams;
    }

    public static getDefaultRequiredParameterValues({
        params
    }: {
        params: Array<PocketParameter>;
    }): Array<PocketArgument> {
        // Check if the arguments and parameters are valid
        const defaultRequiredParams = PocketConfiguration.getRequiredParameters({ params });

        const defaultRequiredParamValues = new Array<PocketArgument>();
        // const missingDefaultRequiredParams = new Array<PocketParameter>();

        for (const param of defaultRequiredParams) {
            const defaultValue = param.default;
           if (defaultValue) {
                defaultRequiredParamValues.push(new PocketArgument({
                    name: PocketConfiguration.getNameOrKey({ param }),
                    value: defaultValue
                }));
            }
            else {
                defaultRequiredParamValues.push(new PocketArgument({
                    name: PocketConfiguration.getNameOrKey({ param }),
                    value: undefined
                }));
            }
            // else {
            //     missingDefaultRequiredParams.push(param);
            // }
        }

        return defaultRequiredParamValues;
    }

    public static getRequiredArguments({
        args,
        params
    }: {
        args: Array<PocketArgument>;
        params: Array<PocketParameter>;
    }): Array<PocketArgument> {

        const requiredParams = PocketConfiguration.getRequiredParameters({ params });

        const missingRequiredParams = new Array<PocketParameter>();
        const arguments_ = new Array<PocketArgument>();

        for (const param of requiredParams) {
            const arg = args.find((arg) => arg.name === PocketConfiguration.getNameOrKey({ param }));
            if (arg) {
                arguments_.push(arg);
            }
            else if (param.default !== undefined) {
                arguments_.push(new PocketArgument({
                    name: PocketConfiguration.getNameOrKey({ param }),
                    value: param.default
                }));
            }
            else {
                missingRequiredParams.push(param);
            }
        }

        if (missingRequiredParams.length > 0) {
            throw new Error(`Missing required parameters: ${missingRequiredParams.map((param) => param.name).join(", ")}`);
        }

        return arguments_;
    }

    public static getArgRecords({
        args,
        params,
        allowAdditionalArgs = true
    }: {
        args: Array<PocketArgument>;
        params: Array<PocketParameter>;
        allowAdditionalArgs?: boolean;
    }): Array<Record<BaseValueKey, BaseValue>> {
        const argRecords = new Array<Record<BaseValueKey, BaseValue>>();
        
        for (const arg of args) {
            // Check if the argument has a corresponding parameter
            const param = params.find((param) => PocketConfiguration.getNameOrKey({param}) === arg.name);
            if (
                param === undefined
                && allowAdditionalArgs === false
            ) {
                throw new Error(`Argument ${arg.nameString} does not have a corresponding parameter and additional arguments are not allowed.`);
            }

            // Check if the argument value is valid
            if (
                param !== undefined
                && param.required === true
                && param.default === undefined
                && arg.value === undefined
            ) {
                throw new Error(`Argument ${arg.nameString} is required but has no value.`);
            }

            // append the argument record
            argRecords.push({
                [arg.name]: arg.value
            });

        }

        return argRecords;
    }
}

export {
    PocketConfiguration
}