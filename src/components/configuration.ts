import { PocketArgument } from "./argument";
import { PocketParameter } from "./parameter";
import { BaseValue, BaseValueKey } from "@templates/v0/base/value";
import { BaseConfiguration } from "@templates/v0";
import { Freezer } from "@utilities/freezer";
import { Checks } from "@utilities/checks";


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
    public arguments: Array<PocketArgument<T>>;

    /**
     * The parameters for the configuration.
     */
    public parameters: Array<PocketParameter<T>>;


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

        // Freeze the object to make it immutable
        Freezer.deepFreeze(this);
    }

    public static getNameOrKey({
        param
    }: {
        param: PocketParameter;
    }): BaseValueKey {
        if (param.key) {
            return param.key;
        }
        else if (
            param.nameString !== undefined
            && Checks.isEmpty(param.nameString) === false
        ) {
            return param.name;
        }
        else {
            throw new Error(`Parameter ${param.nameString} does not have a key or name.`);
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
        allowAdditionalArgs = true,
        allowNonRequired = false
    }: {
        args?: Array<PocketArgument>;
        params: Array<PocketParameter>;
        allowAdditionalArgs?: boolean;
        allowNonRequired?: boolean;
    }): Array<Record<BaseValueKey, BaseValue>> {
        const argRecords = new Array<Record<BaseValueKey, BaseValue>>();

        if (args === undefined) {
            args = new Array<PocketArgument>();
        }
       
        for (const param of params) {
            const arg = args.find((arg) => arg.name === PocketConfiguration.getNameOrKey({ param }));

            // Check if an argument is required and defined either in the argument or parameter
            if (
                arg !== undefined
                && param.required === true
                && param.default === undefined
                && arg.value === undefined
            ) {
                throw new Error(`Argument ${arg.nameString} is required but has no value.`);
            }
        
            else if (
                arg !== undefined
                && param.required === true
                && param.default === undefined
                && arg.value !== undefined
                && Checks.isEmpty(arg.value) === false
            ) {
                argRecords.push({
                    [PocketConfiguration.getNameOrKey({ param })]: arg.value
                }); 
            }
            else if (
                param.required === true
                && param.default !== undefined
            ) {
                argRecords.push({
                    [PocketConfiguration.getNameOrKey({ param })]: param.default
                });
            }
            else if (
                param.required === false
                && param.default !== undefined
                && allowNonRequired === true
            ) {
                argRecords.push({
                    [PocketConfiguration.getNameOrKey({ param })]: param.default
                });
            }
            else if (
                param.required === false
                && arg !== undefined
                && arg.value !== undefined
                && Checks.isEmpty(arg.value) === false
                && allowNonRequired === true
            ) {
                argRecords.push({
                    [PocketConfiguration.getNameOrKey({ param })]: arg.value
                });
            }
        }

        if (allowAdditionalArgs === true) {
            for (const arg of args) {
                // Check if the argument has a corresponding parameter
                const param = params.find((param) => PocketConfiguration.getNameOrKey({param}) === arg.name);
                if (
                    param === undefined
                    && allowAdditionalArgs === true
                ) {
                    argRecords.push({
                        [arg.name]: arg.value
                    });
                }
            }
        }

        const requiredParams = PocketConfiguration.getRequiredParameters({ params });

        const missingRequiredParams = new Array<PocketParameter>();
        for (const param of requiredParams) {
            const arg = argRecords.find((argRecord) => argRecord[PocketConfiguration.getNameOrKey({ param })] !== undefined);
            if (arg === undefined) {
                missingRequiredParams.push(param);
            }
        }

        if (missingRequiredParams.length > 0) {
            throw new Error(`Missing required parameters: ${missingRequiredParams.map((param) => param.name).join(", ")}`);
        }

        return argRecords;
    }

    public preparedArgs({
        allowAdditionalArgs = true,
        allowNonRequired = false
    }: {
        allowAdditionalArgs?: boolean;
        allowNonRequired?: boolean;
    } = {}): Array<Record<BaseValueKey, BaseValue>> {
        return PocketConfiguration.getArgRecords({
            args: this.arguments,
            params: this.parameters,
            allowAdditionalArgs,
            allowNonRequired
        });
    }
    

    public getPreparedArgByName<
        T extends BaseValue = any
    > (
        name: BaseValueKey
    ): PocketArgument<T> | undefined {
        const preparedArgs = this.preparedArgs({allowNonRequired: true});
        for (const arg of preparedArgs) {
            if (arg[name] !== undefined) {
                return new PocketArgument<T>({
                    name: name,
                    value: arg[name]
                });
            }
            // console.log(`arg: ${JSON.stringify(arg)}`);
        }
        // if (arg) {
        //     return new PocketArgument<T>({
        //         name: name,
        //         value: arg.
        //     });
        // }
        return undefined;
    }
}

export {
    PocketConfiguration
}