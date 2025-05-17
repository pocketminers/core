import { PocketArgument } from "../base/argument.js";
import { BaseMessageLevels, BaseSuccessCodes } from "../../templates/v0/index.js";
import { Checks } from "../../utilities/checks.js";
import { PocketMessage } from "../base/message.js";
import { Immuteable } from "../base/index.js";
/**
 * PocketConfiguration is a generic type that represents a configuration object.
 */
class PocketConfiguration extends Immuteable {
    /**
     * The arguments for the configuration.
     */
    arguments;
    /**
     * The parameters for the configuration.
     */
    parameters;
    /**
     * The constructor for the PocketConfiguration class.
     *
     * @param args - The arguments for the configuration.
     * @param params - The parameters for the configuration.
     */
    constructor({ args = [], params = [], options: { freeze = true, allowDuplicateArgs = false } = {} } = {}) {
        // Check if the arguments and parameters are valid
        PocketConfiguration.checkArgsForDuplicates({ args, allowDuplicateArgs });
        PocketConfiguration.checkParamsForDuplicates({ params });
        super({
            freeze,
            allowDuplicateArgs
        }, PocketConfiguration.prototype);
        // Initialize the arguments and parameters
        this.arguments = args;
        this.parameters = params;
        this.initializeImmuteable({ force: true });
    }
    static checkArgsForDuplicates({ args = [], allowDuplicateArgs = false }) {
        if (allowDuplicateArgs === true) {
            return true;
        }
        const argNames = args.map((arg) => arg.name);
        const uniqueArgNames = new Set(argNames);
        if (argNames.length !== uniqueArgNames.size) {
            throw new Error(`Duplicate argument names found: ${argNames.join(", ")}`);
        }
        return true;
    }
    static checkParamsForDuplicates({ params = [] }) {
        const paramNames = params.map((param) => param.name);
        const uniqueParamNames = new Set(paramNames);
        if (paramNames.length !== uniqueParamNames.size) {
            throw new Error(`Duplicate parameter names found: ${paramNames.join(", ")}`);
        }
        return true;
    }
    static checkIfParameterIsValid({ params, param }) {
        // Check if the parameter is valid
        if (param === undefined) {
            throw new Error(`Parameter is undefined.`);
        }
        if (Checks.isEmpty(param.name) === true) {
            throw new Error(`Parameter ${param.nameString} does not have a name.`);
        }
        return true;
    }
    /**
     * Returns the name or key of a parameter.
     * - If the parameter has a key, it is returned.
     * - If the parameter does not have a key, the name is returned.
     * - If neither is available, an error is thrown.
     *
     * @param param - The parameter to get the name or key from.
     * @returns The name or key of the parameter.
     */
    static getParameterNameOrKey(param, toString = false) {
        /**
         * The key of the parameter is returned if it is defined.
         */
        if (param.key) {
            return param.key;
        }
        /**
         * The name of the parameter is returned if it is defined.
         */
        else if (param.name !== undefined
            && Checks.isEmpty(param.name) === false) {
            return param.name;
        }
        /**
         * The nameString of the parameter is returned if "toString" is true and the nameString is defined.
         * This is useful for converting the parameter to a string representation for display purposes.
         */
        else if (toString === true
            && param.nameString !== undefined
            && Checks.isEmpty(param.nameString) === false) {
            return param.nameString;
        }
        /**
         * An error is thrown if neither the key nor the name is defined.
         */
        else {
            throw new Error(`Parameter ${param.nameString} does not have a key or name.`);
        }
    }
    addParameter(param) {
        // Check if the parameter is valid
        if (param === undefined) {
            throw new Error(`Parameter is undefined.`);
        }
        if (param.name === undefined) {
            throw new Error(`Parameter ${param.nameString} does not have a name.`);
        }
        if (param.key === undefined) {
            throw new Error(`Parameter ${param.nameString} does not have a key.`);
        }
        this.parameters.push(param);
        return new PocketMessage({
            body: `Parameter ${param.nameString} added to configuration.`,
            code: BaseSuccessCodes.OK,
            level: BaseMessageLevels.SUCCESS,
        });
    }
    static getRequiredParameters({ params }) {
        const requiredParams = new Array();
        for (const param of params) {
            if (param.required === true) {
                requiredParams.push(param);
            }
        }
        return requiredParams;
    }
    static getOptionalParameters({ params }) {
        const optionalParams = new Array();
        for (const param of params) {
            if (param.required === false) {
                optionalParams.push(param);
            }
        }
        return optionalParams;
    }
    static getDefaultRequiredParameterValues({ params }) {
        const defaultRequiredParams = PocketConfiguration.getRequiredParameters({ params });
        const defaultRequiredParamValues = new Array();
        for (const param of defaultRequiredParams) {
            const defaultValue = param.default;
            if (defaultValue !== undefined
                && Checks.isEmpty(defaultValue) === false) {
                defaultRequiredParamValues.push(new PocketArgument({
                    name: PocketConfiguration.getParameterNameOrKey(param),
                    value: defaultValue
                }));
            }
            else {
                defaultRequiredParamValues.push(new PocketArgument({
                    name: PocketConfiguration.getParameterNameOrKey(param),
                    value: undefined
                }));
            }
        }
        return defaultRequiredParamValues;
    }
    static getArgumentFromArray({ args = [], name }) {
        const arg = args.find((arg) => arg.name === name);
        if (arg !== undefined) {
            return arg;
        }
        return undefined;
    }
    static checkIfArgumentValueIsValidOrDefault({ arg, param, throwError = false }) {
        const possibleValues = [param.default, ...param.options];
        /**
         * Check if the argument value is valid according to the parameter's rules.
         *
         */
        if (arg.value !== undefined
            && Checks.isEmpty(arg.value) === false
            && param.options.length > 0
            && possibleValues.includes(arg.value) === false) {
            if (throwError === false) {
                return false;
            }
            throw new Error(`Argument ${arg.nameString} is not a valid value. Possible values are: ${param.options.join(", ")}`);
        }
        return true;
    }
    /**
     * Returns the required arguments from a set of PocketParameters.
     *
     * @param args - The arguments for the configuration.
     * @param params - The parameters for the configuration.
     * @returns The required arguments from the set of PocketParameters.
     */
    static getRequiredArguments({ args = [], params }) {
        const requiredArgs = new Array();
        // const defaultArgs = PocketConfiguration.getDefaultRequiredParameterValues({ params });
        // for (const arg of args) {
        //     const param = params.find((param) => PocketConfiguration.getParameterNameOrKey(param) === arg.name);
        //     if (param !== undefined) {
        //         if (
        //             param.required === true
        //             && Checks.isEmpty(arg.value) === false
        //         ) {
        //             requiredArgs.push(arg);
        //         }
        //         else if (
        //             param.required === true
        //             && Checks.isEmpty(arg.value) === true
        //         ) {
        //             requiredArgs.push(new PocketArgument({
        //                 name: PocketConfiguration.getParameterNameOrKey(param),
        //                 value: defaultArgs.find((defaultArg) => defaultArg.name === arg.name)?.value
        //             }));
        //         }
        //     }
        // }
        // for (const param of params) {
        //     const arg = args.find((arg) => arg.name === PocketConfiguration.getParameterNameOrKey(param));
        //     if (arg === undefined) {
        //         if (
        //             param.required === true
        //             && Checks.isEmpty(param.default) === false
        //         ) {
        //             requiredArgs.push(new PocketArgument({
        //                 name: PocketConfiguration.getParameterNameOrKey(param),
        //                 value: param.default
        //             }));
        //         }
        //     }
        // }
        return requiredArgs;
        // const requiredParams = PocketConfiguration.getRequiredParameters({ params });
        // const missingRequiredParams = new Array<PocketParameter>();
        // const arguments_ = new Array<PocketArgument>();
        // for (const param of requiredParams) {
        //     const arg = args.find((arg) => arg.name === PocketConfiguration.getParameterNameOrKey(param));
        //     if (arg) {
        //         arguments_.push(arg);
        //     }
        //     else if (param.default !== undefined) {
        //         arguments_.push(new PocketArgument({
        //             name: PocketConfiguration.getParameterNameOrKey(param),
        //             value: param.default
        //         }));
        //     }
        //     else {
        //         missingRequiredParams.push(param);
        //     }
        // }
        // if (missingRequiredParams.length > 0) {
        //     throw new Error(`Missing required parameters: ${missingRequiredParams.map((param) => param.name).join(", ")}`);
        // }
        // return arguments_;
    }
    static getArgRecords({ args = [], params, allowAdditionalArgs = true, allowNonRequired = false }) {
        const argRecords = new Array();
        const missingArgs = new Array();
        const checkedArgs = PocketConfiguration.getRequiredArguments({
            args,
            params
        });
        for (const checkedArg of checkedArgs) {
            if (checkedArg.value !== undefined) {
                argRecords.push({
                    [checkedArg.name]: checkedArg.value
                });
            }
            else {
                missingArgs.push(checkedArg);
            }
        }
        if (missingArgs.length > 0) {
            throw new Error(`Missing required arguments: ${missingArgs.map((arg) => arg.name).join(", ")}`);
        }
        // if (args === undefined) {
        //     args = new Array<PocketArgument>();
        // }
        // for (const param of params) {
        //     const arg = args.find((arg) => arg.name === PocketConfiguration.getParameterNameOrKey(param));
        //     // Check if an argument is required and defined either in the argument or parameter
        //     if (
        //         arg === undefined
        //         && param.required === true
        //         && param.default === undefined
        //         // && arg.value === undefined
        //     ) {
        //         throw new Error(`Argument ${arg.nameString} is required but has no value.`);
        //     }
        //     else if (
        //         arg !== undefined
        //         && param.required === true
        //         && param.default === undefined
        //         && arg.value !== undefined
        //         && Checks.isEmpty(arg.value) === false
        //     ) {
        //         argRecords.push({
        //             [PocketConfiguration.getParameterNameOrKey(param)]: arg.value
        //         }); 
        //     }
        //     else if (
        //         param.required === true
        //         && param.default !== undefined
        //     ) {
        //         argRecords.push({
        //             [PocketConfiguration.getParameterNameOrKey(param)]: param.default
        //         });
        //     }
        //     else if (
        //         param.required === false
        //         && param.default !== undefined
        //         && allowNonRequired === true
        //     ) {
        //         argRecords.push({
        //             [PocketConfiguration.getParameterNameOrKey(param)]: param.default
        //         });
        //     }
        //     else if (
        //         param.required === false
        //         && arg !== undefined
        //         && arg.value !== undefined
        //         && Checks.isEmpty(arg.value) === false
        //         && allowNonRequired === true
        //     ) {
        //         argRecords.push({
        //             [PocketConfiguration.getParameterNameOrKey(param)]: arg.value
        //         });
        //     }
        // }
        // if (allowAdditionalArgs === true) {
        //     for (const arg of args) {
        //         // Check if the argument has a corresponding parameter
        //         const param = params.find((param) => PocketConfiguration.getParameterNameOrKey(param) === arg.name);
        //         if (
        //             param === undefined
        //             && allowAdditionalArgs === true
        //         ) {
        //             argRecords.push({
        //                 [arg.name]: arg.value
        //             });
        //         }
        //     }
        // }
        // const requiredParams = PocketConfiguration.getRequiredParameters({ params });
        // const missingRequiredParams = new Array<PocketParameter>();
        // for (const param of requiredParams) {
        //     const arg = argRecords.find((argRecord) => argRecord[PocketConfiguration.getParameterNameOrKey(param)] !== undefined);
        //     if (arg === undefined) {
        //         missingRequiredParams.push(param);
        //     }
        // }
        // if (missingRequiredParams.length > 0) {
        //     throw new Error(`Missing required parameters: ${missingRequiredParams.map((param) => param.name).join(", ")}`);
        // }
        return argRecords;
    }
    preparedArgs({ allowAdditionalArgs = true, allowNonRequired = false } = {}) {
        const preparedArgs = PocketConfiguration.getArgRecords({
            args: this.arguments,
            params: this.parameters,
            allowAdditionalArgs,
            allowNonRequired
        });
        const preparedArgsObject = {};
        for (const arg of preparedArgs) {
            const key = Object.keys(arg)[0];
            const value = arg[key];
            preparedArgsObject[key] = value;
        }
        return preparedArgsObject;
    }
    getPreparedArgByName(key) {
        const preparedArgs = this.preparedArgs({ allowNonRequired: true });
        if (preparedArgs === undefined) {
            return undefined;
        }
        // Check if the argument has a corresponding parameter
        const arg = this.arguments.find((arg) => arg.name === key);
        if (arg !== undefined) {
            return new PocketArgument({
                name: key,
                value: arg.value
            });
        }
        return undefined;
    }
}
export { PocketConfiguration };
//# sourceMappingURL=configuration.js.map