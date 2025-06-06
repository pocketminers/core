"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocketConfiguration = void 0;
const argument_1 = require("../base/argument.js");
const checks_1 = require("../../utilities/checks.js");
const base_1 = require("../base/index.js");
/**
 * PocketConfiguration is a generic type that represents a configuration object.
 */
class PocketConfiguration extends base_1.Immuteable {
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
     * @param configuration - The configuration options for the PocketConfiguration class.
     */
    constructor({ args = [], params = [], configuration: { freeze = true, allowDuplicateArgs = false } = {} } = {}) {
        PocketConfiguration.checkForDuplicateArguments({ args, allowDuplicateArgs });
        PocketConfiguration.checkForDuplicateParameters({ params });
        super({
            freeze,
            allowDuplicateArgs
        }, PocketConfiguration.prototype);
        this.arguments = args;
        this.parameters = params;
        this.initializeImmuteable({ force: true });
    }
    /**
     * Checks an array of arguments for duplicates.
     * - if duplicates are found and allowDuplicates is false, an error is thrown.
     * - if duplicates are found and allowDuplicates is true, the function returns true.
     */
    static checkForDuplicateArguments({ args = [], allowDuplicateArgs = false }) {
        const duplicateArguments = new Array();
        for (const arg of args) {
            const argName = arg.name;
            const foundArgs = args.filter((arg) => arg.name === argName);
            if (foundArgs.length > 1) {
                duplicateArguments.push(arg);
            }
        }
        if (duplicateArguments.length > 0
            && allowDuplicateArgs === false) {
            throw new Error(`Duplicate argument found: ${duplicateArguments.map((arg) => arg.name).join(", ")}`);
        }
        return true;
    }
    /**
     * Checks an array of parameters for duplicates.
     * - if duplicates are found and allowDuplicates is false, an error is thrown.
     * - if duplicates are found and allowDuplicates is true, the function returns true.
     */
    static checkForDuplicateParameters({ params = [], allowDuplicateParams = false }) {
        const duplicateParameters = new Array();
        for (const param of params) {
            const paramName = param.name;
            const foundParams = params.filter((param) => param.name === paramName);
            if (foundParams.length > 1) {
                duplicateParameters.push(param);
            }
        }
        if (duplicateParameters.length > 0
            && allowDuplicateParams === false) {
            throw new Error(`Duplicate parameter found: ${duplicateParameters.map((param) => param.name).join(", ")}`);
        }
        return true;
    }
    /**
     * Checks if a parameter is valid.
     * - If the parameter is undefined, an error is thrown.
     * - If the parameter does not have a name, an error is thrown.
     * - If the parameter is valid, true is returned.
     */
    static checkIfParameterIsValid({ params, param }) {
        // Check if the parameter is valid
        if (param === undefined) {
            throw new Error(`Parameter is undefined.`);
        }
        if (checks_1.Checks.isEmpty(param.name) === true) {
            throw new Error(`Parameter ${param.nameString} does not have a name.`);
        }
        return true;
    }
    /**
     * Returns the name or key of a parameter.
     * - If the parameter has a key, it is returned.
     * - If the parameter does not have a key, the name is returned.
     * - If neither is available, an error is thrown.
     */
    static getParameterNameOrKey(param, toString = false) {
        let response = "";
        /**
         * The key of the parameter is returned if it is defined.
         */
        if (param.key !== undefined
            && checks_1.Checks.isEmpty(param.key) === false) {
            response = param.key;
        }
        /**
         * The name of the parameter is returned if it is defined.
         */
        else if (param.name !== undefined
            && checks_1.Checks.isEmpty(param.name) === false) {
            response = param.name;
        }
        if (toString === true
            && checks_1.Checks.isEmpty(response) === false) {
            return String(response);
        }
        /**
         * An error is thrown if neither the key nor the name is defined.
         */
        else if (checks_1.Checks.isEmpty(response) === true) {
            throw new Error(`Parameter ${param.nameString} does not have a key or name.`);
        }
        return response;
    }
    /**
     * Adds a parameter to the configuration.
     * - If the Configuration is frozen, a new PocketConfiguration object is returned.
     */
    addParameter(param) {
        if (this.getOption('freeze') === true) {
            return new PocketConfiguration({
                args: this.arguments,
                params: [...this.parameters, param],
                configuration: {
                    freeze: true,
                    allowDuplicateArgs: this.getOption('allowDuplicateArgs')
                }
            });
        }
        this.parameters.push(param);
        return this;
    }
    /**
     * Get an array of paramaters that are required.
     */
    static getRequiredParameters({ params }) {
        const requiredParams = new Array();
        for (const param of params) {
            if (param.required === true) {
                requiredParams.push(param);
            }
        }
        return requiredParams;
    }
    /**
     * Get an array of paramaters that are not required.
     */
    static getOptionalParameters({ params }) {
        const optionalParams = new Array();
        for (const param of params) {
            if (param.required === false) {
                optionalParams.push(param);
            }
        }
        return optionalParams;
    }
    /**
     * Get an array of arguments from an array of parameters.
     * - The arguments are created from the default values of the parameters.
     * - The arguments are created with the name or key of the parameter (key takes precendence).
     */
    static getDefaultParameterValuesAsArguments({ params, allowNonRequired = false }) {
        const defaultValuesAsArguments = new Array();
        for (const param of params) {
            if (allowNonRequired === true
                && param.required === false) {
                defaultValuesAsArguments.push(new argument_1.PocketArgument({
                    name: PocketConfiguration.getParameterNameOrKey(param),
                    value: param.default,
                    configuration: {
                        allowEmpty: true,
                        freeze: true
                    }
                }));
            }
            if (param.required === true) {
                defaultValuesAsArguments.push(new argument_1.PocketArgument({
                    name: PocketConfiguration.getParameterNameOrKey(param),
                    value: param.default,
                    configuration: {
                        allowEmpty: true,
                        freeze: true
                    }
                }));
            }
        }
        return defaultValuesAsArguments;
    }
    /**
     * Get an argument by name from an array of arguments.
     */
    static getArgumentFromArray({ args = [], name }) {
        const foundArgs = Array();
        for (const arg of args) {
            if (arg.name === name) {
                foundArgs.push(arg);
            }
        }
        if (foundArgs.length > 0) {
            return foundArgs;
        }
        return undefined;
    }
    /**
     * Check if the argument value is valid according to the parameter.
     * - This involves checking if the value is included in the default or optional values.
     * - If the value is not valid, an error is thrown if throwError is true.
     * - If the value is valid, true is returned.
     * - If the value is not valid and throwError is false, false is returned.
     */
    static checkIfArgumentValueIsValidOrDefault({ arg, param, throwError = false }) {
        const possibleValues = [param.default, ...param.options];
        /**
         * Check if the argument value is valid according and included in either the default or optional values.
         *
         */
        if (arg.value !== undefined
            && checks_1.Checks.isEmpty(arg.value) === false
            && param.options.length > 0
            && possibleValues.includes(arg.value) === false) {
            if (throwError === false) {
                return false;
            }
            throw new Error(`Argument ${arg.nameString} is not a valid value. Possible values are: ${possibleValues.join(", ")}`);
        }
        return true;
    }
    /**
     * Returns the required arguments from a set of PocketParameters and PocketArguments.
     */
    static getRequiredAndSetArguments({ args = [], params = [], includeAdditionalArgs = true }) {
        const requiredParameters = PocketConfiguration.getRequiredParameters({ params });
        const requiredAndSetArgs = new Array();
        for (const requiredParameter of requiredParameters) {
            const passedArgs = PocketConfiguration.getArgumentFromArray({ args, name: PocketConfiguration.getParameterNameOrKey(requiredParameter) });
            if (passedArgs !== undefined && passedArgs.length > 0) {
                for (const foundArg of passedArgs) {
                    if (foundArg.value !== undefined) {
                        requiredAndSetArgs.push(foundArg);
                    }
                    else {
                        requiredAndSetArgs.push(new argument_1.PocketArgument({
                            name: PocketConfiguration.getParameterNameOrKey(requiredParameter),
                            value: requiredParameter.default,
                            configuration: {
                                allowEmpty: true,
                                freeze: true
                            }
                        }));
                    }
                }
            }
            else {
                requiredAndSetArgs.push(new argument_1.PocketArgument({
                    name: PocketConfiguration.getParameterNameOrKey(requiredParameter),
                    value: requiredParameter.default,
                    configuration: {
                        allowEmpty: true,
                        freeze: true
                    }
                }));
            }
        }
        for (const arg of args) {
            const param = params.find((param) => PocketConfiguration.getParameterNameOrKey(param) === arg.name);
            if (param === undefined
                && checks_1.Checks.isEmpty(arg.value) === false
                && checks_1.Checks.isEmpty(arg.name) === false
                && includeAdditionalArgs === true) {
                requiredAndSetArgs.push(arg);
            }
        }
        return requiredAndSetArgs;
    }
    // public static getArgRecords({
    //     args = [],
    //     params,
    //     allowAdditionalArgs = true,
    //     allowNonRequired = false
    // }: {
    //     args?: Array<PocketArgument>;
    //     params: Array<PocketParameter>;
    //     allowAdditionalArgs?: boolean;
    //     allowNonRequired?: boolean;
    // }): Array<Record<BaseValueKey, BaseValue>> {
    //     const argRecords = new Array<Record<BaseValueKey, BaseValue>>();
    //     const missingArgs = new Array<PocketArgument>();
    //     const checkedArgs = PocketConfiguration.getRequiredAndSetArguments({
    //         args,
    //         params
    //     });
    //     for (const checkedArg of checkedArgs) {
    //         if (checkedArg.value !== undefined) {
    //             argRecords.push({
    //                 [checkedArg.name]: checkedArg.value
    //             });
    //         }
    //         else {
    //             missingArgs.push(checkedArg);
    //         }
    //     }
    //     if (missingArgs.length > 0) {
    //         throw new Error(`Missing required arguments: ${missingArgs.map((arg) => arg.name).join(", ")}`);
    //     }
    //     // if (args === undefined) {
    //     //     args = new Array<PocketArgument>();
    //     // }
    //     // for (const param of params) {
    //     //     const arg = args.find((arg) => arg.name === PocketConfiguration.getParameterNameOrKey(param));
    //     //     // Check if an argument is required and defined either in the argument or parameter
    //     //     if (
    //     //         arg === undefined
    //     //         && param.required === true
    //     //         && param.default === undefined
    //     //         // && arg.value === undefined
    //     //     ) {
    //     //         throw new Error(`Argument ${arg.nameString} is required but has no value.`);
    //     //     }
    //     //     else if (
    //     //         arg !== undefined
    //     //         && param.required === true
    //     //         && param.default === undefined
    //     //         && arg.value !== undefined
    //     //         && Checks.isEmpty(arg.value) === false
    //     //     ) {
    //     //         argRecords.push({
    //     //             [PocketConfiguration.getParameterNameOrKey(param)]: arg.value
    //     //         }); 
    //     //     }
    //     //     else if (
    //     //         param.required === true
    //     //         && param.default !== undefined
    //     //     ) {
    //     //         argRecords.push({
    //     //             [PocketConfiguration.getParameterNameOrKey(param)]: param.default
    //     //         });
    //     //     }
    //     //     else if (
    //     //         param.required === false
    //     //         && param.default !== undefined
    //     //         && allowNonRequired === true
    //     //     ) {
    //     //         argRecords.push({
    //     //             [PocketConfiguration.getParameterNameOrKey(param)]: param.default
    //     //         });
    //     //     }
    //     //     else if (
    //     //         param.required === false
    //     //         && arg !== undefined
    //     //         && arg.value !== undefined
    //     //         && Checks.isEmpty(arg.value) === false
    //     //         && allowNonRequired === true
    //     //     ) {
    //     //         argRecords.push({
    //     //             [PocketConfiguration.getParameterNameOrKey(param)]: arg.value
    //     //         });
    //     //     }
    //     // }
    //     // if (allowAdditionalArgs === true) {
    //     //     for (const arg of args) {
    //     //         // Check if the argument has a corresponding parameter
    //     //         const param = params.find((param) => PocketConfiguration.getParameterNameOrKey(param) === arg.name);
    //     //         if (
    //     //             param === undefined
    //     //             && allowAdditionalArgs === true
    //     //         ) {
    //     //             argRecords.push({
    //     //                 [arg.name]: arg.value
    //     //             });
    //     //         }
    //     //     }
    //     // }
    //     // const requiredParams = PocketConfiguration.getRequiredParameters({ params });
    //     // const missingRequiredParams = new Array<PocketParameter>();
    //     // for (const param of requiredParams) {
    //     //     const arg = argRecords.find((argRecord) => argRecord[PocketConfiguration.getParameterNameOrKey(param)] !== undefined);
    //     //     if (arg === undefined) {
    //     //         missingRequiredParams.push(param);
    //     //     }
    //     // }
    //     // if (missingRequiredParams.length > 0) {
    //     //     throw new Error(`Missing required parameters: ${missingRequiredParams.map((param) => param.name).join(", ")}`);
    //     // }
    //     return argRecords;
    // }
    preparedArgs({ allowAdditionalArgs = true, allowNonRequired = false } = {}) {
        const preparedArgs = PocketConfiguration.getRequiredAndSetArguments({
            args: this.arguments,
            params: this.parameters
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
            return new argument_1.PocketArgument({
                name: key,
                value: arg.value
            });
        }
        return undefined;
    }
}
exports.PocketConfiguration = PocketConfiguration;
//# sourceMappingURL=configuration.js.map