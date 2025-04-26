"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocketConfiguration = void 0;
const argument_1 = require("./argument.js");
const freezer_1 = require("../utilities/freezer.js");
const checks_1 = require("../utilities/checks.js");
/**
 * PocketConfiguration is a generic type that represents a configuration object.
 */
class PocketConfiguration {
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
     * @param arguments_ - The arguments for the configuration.
     * @param parameters_ - The parameters for the configuration.
     */
    constructor({ args = [], params = [] } = {}) {
        this.arguments = args;
        this.parameters = params;
        // Freeze the object to make it immutable
        freezer_1.Freezer.deepFreeze(this);
    }
    preparedArgs({ allowAdditionalArgs = true, allowNonRequired = false } = {}) {
        return PocketConfiguration.getArgRecords({
            args: this.arguments,
            params: this.parameters,
            allowAdditionalArgs,
            allowNonRequired
        });
    }
    static getNameOrKey({ param }) {
        if (param.key) {
            return param.key;
        }
        else if (param.nameString !== undefined
            && checks_1.Checks.isEmpty(param.nameString) === false) {
            return param.name;
        }
        else {
            throw new Error(`Parameter ${param.nameString} does not have a key or name.`);
        }
    }
    static getRequiredParameters({ params }) {
        // Check if the arguments and parameters are valid
        const requiredParams = new Array();
        for (const param of params) {
            if (param.required) {
                requiredParams.push(param);
            }
        }
        return requiredParams;
    }
    static getOptionalParameters({ params }) {
        // Check if the arguments and parameters are valid
        const optionalParams = new Array();
        for (const param of params) {
            if (!param.required) {
                optionalParams.push(param);
            }
        }
        return optionalParams;
    }
    static getDefaultRequiredParameterValues({ params }) {
        // Check if the arguments and parameters are valid
        const defaultRequiredParams = PocketConfiguration.getRequiredParameters({ params });
        const defaultRequiredParamValues = new Array();
        // const missingDefaultRequiredParams = new Array<PocketParameter>();
        for (const param of defaultRequiredParams) {
            const defaultValue = param.default;
            if (defaultValue) {
                defaultRequiredParamValues.push(new argument_1.PocketArgument({
                    name: PocketConfiguration.getNameOrKey({ param }),
                    value: defaultValue
                }));
            }
            else {
                defaultRequiredParamValues.push(new argument_1.PocketArgument({
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
    static getRequiredArguments({ args, params }) {
        const requiredParams = PocketConfiguration.getRequiredParameters({ params });
        const missingRequiredParams = new Array();
        const arguments_ = new Array();
        for (const param of requiredParams) {
            const arg = args.find((arg) => arg.name === PocketConfiguration.getNameOrKey({ param }));
            if (arg) {
                arguments_.push(arg);
            }
            else if (param.default !== undefined) {
                arguments_.push(new argument_1.PocketArgument({
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
    static getArgRecords({ args, params, allowAdditionalArgs = true, allowNonRequired = false }) {
        const argRecords = new Array();
        if (args === undefined) {
            args = new Array();
        }
        for (const param of params) {
            const arg = args.find((arg) => arg.name === PocketConfiguration.getNameOrKey({ param }));
            // Check if an argument is required and defined either in the argument or parameter
            if (arg !== undefined
                && param.required === true
                && param.default === undefined
                && arg.value === undefined) {
                throw new Error(`Argument ${arg.nameString} is required but has no value.`);
            }
            else if (arg !== undefined
                && param.required === true
                && param.default === undefined
                && arg.value !== undefined
                && checks_1.Checks.isEmpty(arg.value) === false) {
                argRecords.push({
                    [PocketConfiguration.getNameOrKey({ param })]: arg.value
                });
            }
            else if (param.required === true
                && param.default !== undefined) {
                argRecords.push({
                    [PocketConfiguration.getNameOrKey({ param })]: param.default
                });
            }
            else if (param.required === false
                && param.default !== undefined
                && allowNonRequired === true) {
                argRecords.push({
                    [PocketConfiguration.getNameOrKey({ param })]: param.default
                });
            }
            else if (param.required === false
                && arg !== undefined
                && arg.value !== undefined
                && checks_1.Checks.isEmpty(arg.value) === false
                && allowNonRequired === true) {
                argRecords.push({
                    [PocketConfiguration.getNameOrKey({ param })]: arg.value
                });
            }
        }
        if (allowAdditionalArgs === true) {
            for (const arg of args) {
                // Check if the argument has a corresponding parameter
                const param = params.find((param) => PocketConfiguration.getNameOrKey({ param }) === arg.name);
                if (param === undefined
                    && allowAdditionalArgs === true) {
                    argRecords.push({
                        [arg.name]: arg.value
                    });
                }
            }
        }
        const requiredParams = PocketConfiguration.getRequiredParameters({ params });
        const missingRequiredParams = new Array();
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
    getPreparedArgByName(name) {
        const preparedArgs = this.preparedArgs({ allowNonRequired: true });
        for (const arg of preparedArgs) {
            if (arg[name] !== undefined) {
                return new argument_1.PocketArgument({
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
exports.PocketConfiguration = PocketConfiguration;
//# sourceMappingURL=configuration.js.map