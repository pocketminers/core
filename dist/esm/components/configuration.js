import { PocketArgument } from "./argument.js";
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
    constructor(args, params) {
        this.arguments = args;
        this.parameters = params;
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
                defaultRequiredParamValues.push(new PocketArgument({
                    name: param.name,
                    value: defaultValue
                }));
            }
            else {
                defaultRequiredParamValues.push(new PocketArgument({
                    name: param.name,
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
            const arg = args.find((arg) => arg.name === param.name);
            if (arg) {
                arguments_.push(arg);
            }
            else if (param.default !== undefined) {
                arguments_.push(new PocketArgument({
                    name: param.name,
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
    static getArgRecords({ args, params, allowAdditionalArgs = true }) {
        const argRecords = new Array();
        for (const arg of args) {
            // Check if the argument has a corresponding parameter
            const param = params.find((param) => param.name === arg.name);
            if (param === undefined
                && allowAdditionalArgs === false) {
                throw new Error(`Argument ${arg.nameString} does not have a corresponding parameter and additional arguments are not allowed.`);
            }
            // Check if the argument value is valid
            if (param !== undefined
                && param.required === true
                && param.default === undefined
                && arg.value === undefined) {
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
export { PocketConfiguration };
//# sourceMappingURL=configuration.js.map