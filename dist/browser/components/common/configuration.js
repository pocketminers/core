var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { PocketArgument } from "../base/argument.js";
import { BaseMessageLevels, BaseSuccessCodes } from "../../templates/v0/index.js";
import { Checks } from "../../utilities/checks.js";
import { PocketMessage } from "../base/message.js";
import { Immuteable } from "../base/index.js";
/**
 * PocketConfiguration is a generic type that represents a configuration object.
 */
var PocketConfiguration = /** @class */ (function (_super) {
    __extends(PocketConfiguration, _super);
    /**
     * The constructor for the PocketConfiguration class.
     *
     * @param args - The arguments for the configuration.
     * @param params - The parameters for the configuration.
     */
    function PocketConfiguration(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.args, args = _c === void 0 ? [] : _c, _d = _b.params, params = _d === void 0 ? [] : _d, _e = _b.options, _f = _e === void 0 ? {} : _e, _g = _f.freeze, freeze = _g === void 0 ? true : _g, _h = _f.allowDuplicateArgs, allowDuplicateArgs = _h === void 0 ? false : _h;
        var _this = this;
        // Check if the arguments and parameters are valid
        PocketConfiguration.checkArgsForDuplicates({ args: args, allowDuplicateArgs: allowDuplicateArgs });
        PocketConfiguration.checkParamsForDuplicates({ params: params });
        _this = _super.call(this, {
            freeze: freeze,
            allowDuplicateArgs: allowDuplicateArgs
        }, PocketConfiguration.prototype) || this;
        // Initialize the arguments and parameters
        _this.arguments = args;
        _this.parameters = params;
        _this.initializeImmuteable({ force: true });
        return _this;
    }
    PocketConfiguration.checkArgsForDuplicates = function (_a) {
        var _b = _a.args, args = _b === void 0 ? [] : _b, _c = _a.allowDuplicateArgs, allowDuplicateArgs = _c === void 0 ? false : _c;
        if (allowDuplicateArgs === true) {
            return true;
        }
        var argNames = args.map(function (arg) { return arg.name; });
        var uniqueArgNames = new Set(argNames);
        if (argNames.length !== uniqueArgNames.size) {
            throw new Error("Duplicate argument names found: ".concat(argNames.join(", ")));
        }
        return true;
    };
    PocketConfiguration.checkParamsForDuplicates = function (_a) {
        var _b = _a.params, params = _b === void 0 ? [] : _b;
        var paramNames = params.map(function (param) { return param.name; });
        var uniqueParamNames = new Set(paramNames);
        if (paramNames.length !== uniqueParamNames.size) {
            throw new Error("Duplicate parameter names found: ".concat(paramNames.join(", ")));
        }
        return true;
    };
    PocketConfiguration.checkIfParameterIsValid = function (_a) {
        var params = _a.params, param = _a.param;
        // Check if the parameter is valid
        if (param === undefined) {
            throw new Error("Parameter is undefined.");
        }
        if (Checks.isEmpty(param.name) === true) {
            throw new Error("Parameter ".concat(param.nameString, " does not have a name."));
        }
        return true;
    };
    /**
     * Returns the name or key of a parameter.
     * - If the parameter has a key, it is returned.
     * - If the parameter does not have a key, the name is returned.
     * - If neither is available, an error is thrown.
     *
     * @param param - The parameter to get the name or key from.
     * @returns The name or key of the parameter.
     */
    PocketConfiguration.getParameterNameOrKey = function (param, toString) {
        if (toString === void 0) { toString = false; }
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
            throw new Error("Parameter ".concat(param.nameString, " does not have a key or name."));
        }
    };
    PocketConfiguration.prototype.addParameter = function (param) {
        // Check if the parameter is valid
        if (param === undefined) {
            throw new Error("Parameter is undefined.");
        }
        if (param.name === undefined) {
            throw new Error("Parameter ".concat(param.nameString, " does not have a name."));
        }
        if (param.key === undefined) {
            throw new Error("Parameter ".concat(param.nameString, " does not have a key."));
        }
        this.parameters.push(param);
        return new PocketMessage({
            body: "Parameter ".concat(param.nameString, " added to configuration."),
            code: BaseSuccessCodes.OK,
            level: BaseMessageLevels.SUCCESS,
        });
    };
    PocketConfiguration.getRequiredParameters = function (_a) {
        var e_1, _b;
        var params = _a.params;
        var requiredParams = new Array();
        try {
            for (var params_1 = __values(params), params_1_1 = params_1.next(); !params_1_1.done; params_1_1 = params_1.next()) {
                var param = params_1_1.value;
                if (param.required === true) {
                    requiredParams.push(param);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (params_1_1 && !params_1_1.done && (_b = params_1.return)) _b.call(params_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return requiredParams;
    };
    PocketConfiguration.getOptionalParameters = function (_a) {
        var e_2, _b;
        var params = _a.params;
        var optionalParams = new Array();
        try {
            for (var params_2 = __values(params), params_2_1 = params_2.next(); !params_2_1.done; params_2_1 = params_2.next()) {
                var param = params_2_1.value;
                if (param.required === false) {
                    optionalParams.push(param);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (params_2_1 && !params_2_1.done && (_b = params_2.return)) _b.call(params_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return optionalParams;
    };
    PocketConfiguration.getDefaultRequiredParameterValues = function (_a) {
        var e_3, _b;
        var params = _a.params;
        var defaultRequiredParams = PocketConfiguration.getRequiredParameters({ params: params });
        var defaultRequiredParamValues = new Array();
        try {
            for (var defaultRequiredParams_1 = __values(defaultRequiredParams), defaultRequiredParams_1_1 = defaultRequiredParams_1.next(); !defaultRequiredParams_1_1.done; defaultRequiredParams_1_1 = defaultRequiredParams_1.next()) {
                var param = defaultRequiredParams_1_1.value;
                var defaultValue = param.default;
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
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (defaultRequiredParams_1_1 && !defaultRequiredParams_1_1.done && (_b = defaultRequiredParams_1.return)) _b.call(defaultRequiredParams_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return defaultRequiredParamValues;
    };
    PocketConfiguration.getArgumentFromArray = function (_a) {
        var _b = _a.args, args = _b === void 0 ? [] : _b, name = _a.name;
        var arg = args.find(function (arg) { return arg.name === name; });
        if (arg !== undefined) {
            return arg;
        }
        return undefined;
    };
    PocketConfiguration.checkIfArgumentValueIsValidOrDefault = function (_a) {
        var arg = _a.arg, param = _a.param, _b = _a.throwError, throwError = _b === void 0 ? false : _b;
        var possibleValues = __spreadArray([param.default], __read(param.options), false);
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
            throw new Error("Argument ".concat(arg.nameString, " is not a valid value. Possible values are: ").concat(param.options.join(", ")));
        }
        return true;
    };
    /**
     * Returns the required arguments from a set of PocketParameters.
     *
     * @param args - The arguments for the configuration.
     * @param params - The parameters for the configuration.
     * @returns The required arguments from the set of PocketParameters.
     */
    PocketConfiguration.getRequiredArguments = function (_a) {
        var _b = _a.args, args = _b === void 0 ? [] : _b, params = _a.params;
        var requiredArgs = new Array();
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
    };
    PocketConfiguration.getArgRecords = function (_a) {
        var e_4, _b, _c;
        var _d = _a.args, args = _d === void 0 ? [] : _d, params = _a.params, _e = _a.allowAdditionalArgs, allowAdditionalArgs = _e === void 0 ? true : _e, _f = _a.allowNonRequired, allowNonRequired = _f === void 0 ? false : _f;
        var argRecords = new Array();
        var missingArgs = new Array();
        var checkedArgs = PocketConfiguration.getRequiredArguments({
            args: args,
            params: params
        });
        try {
            for (var checkedArgs_1 = __values(checkedArgs), checkedArgs_1_1 = checkedArgs_1.next(); !checkedArgs_1_1.done; checkedArgs_1_1 = checkedArgs_1.next()) {
                var checkedArg = checkedArgs_1_1.value;
                if (checkedArg.value !== undefined) {
                    argRecords.push((_c = {},
                        _c[checkedArg.name] = checkedArg.value,
                        _c));
                }
                else {
                    missingArgs.push(checkedArg);
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (checkedArgs_1_1 && !checkedArgs_1_1.done && (_b = checkedArgs_1.return)) _b.call(checkedArgs_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        if (missingArgs.length > 0) {
            throw new Error("Missing required arguments: ".concat(missingArgs.map(function (arg) { return arg.name; }).join(", ")));
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
    };
    PocketConfiguration.prototype.preparedArgs = function (_a) {
        var e_5, _b;
        var _c = _a === void 0 ? {} : _a, _d = _c.allowAdditionalArgs, allowAdditionalArgs = _d === void 0 ? true : _d, _e = _c.allowNonRequired, allowNonRequired = _e === void 0 ? false : _e;
        var preparedArgs = PocketConfiguration.getArgRecords({
            args: this.arguments,
            params: this.parameters,
            allowAdditionalArgs: allowAdditionalArgs,
            allowNonRequired: allowNonRequired
        });
        var preparedArgsObject = {};
        try {
            for (var preparedArgs_1 = __values(preparedArgs), preparedArgs_1_1 = preparedArgs_1.next(); !preparedArgs_1_1.done; preparedArgs_1_1 = preparedArgs_1.next()) {
                var arg = preparedArgs_1_1.value;
                var key = Object.keys(arg)[0];
                var value = arg[key];
                preparedArgsObject[key] = value;
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (preparedArgs_1_1 && !preparedArgs_1_1.done && (_b = preparedArgs_1.return)) _b.call(preparedArgs_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return preparedArgsObject;
    };
    PocketConfiguration.prototype.getPreparedArgByName = function (key) {
        var preparedArgs = this.preparedArgs({ allowNonRequired: true });
        if (preparedArgs === undefined) {
            return undefined;
        }
        // Check if the argument has a corresponding parameter
        var arg = this.arguments.find(function (arg) { return arg.name === key; });
        if (arg !== undefined) {
            return new PocketArgument({
                name: key,
                value: arg.value
            });
        }
        return undefined;
    };
    return PocketConfiguration;
}(Immuteable));
export { PocketConfiguration };
//# sourceMappingURL=configuration.js.map