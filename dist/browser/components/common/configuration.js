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
import { Checks } from "../../utilities/checks.js";
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
     * @param configuration - The configuration options for the PocketConfiguration class.
     */
    function PocketConfiguration(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.args, args = _c === void 0 ? [] : _c, _d = _b.params, params = _d === void 0 ? [] : _d, _e = _b.configuration, _f = _e === void 0 ? {} : _e, _g = _f.freeze, freeze = _g === void 0 ? true : _g, _h = _f.allowDuplicateArgs, allowDuplicateArgs = _h === void 0 ? false : _h;
        var _this = this;
        PocketConfiguration.checkForDuplicateArguments({ args: args, allowDuplicateArgs: allowDuplicateArgs });
        PocketConfiguration.checkForDuplicateParameters({ params: params });
        _this = _super.call(this, {
            freeze: freeze,
            allowDuplicateArgs: allowDuplicateArgs
        }, PocketConfiguration.prototype) || this;
        _this.arguments = args;
        _this.parameters = params;
        _this.initializeImmuteable({ force: true });
        return _this;
    }
    /**
     * Checks an array of arguments for duplicates.
     * - if duplicates are found and allowDuplicates is false, an error is thrown.
     * - if duplicates are found and allowDuplicates is true, the function returns true.
     */
    PocketConfiguration.checkForDuplicateArguments = function (_a) {
        var e_1, _b;
        var _c = _a.args, args = _c === void 0 ? [] : _c, _d = _a.allowDuplicateArgs, allowDuplicateArgs = _d === void 0 ? false : _d;
        var duplicateArguments = new Array();
        var _loop_1 = function (arg) {
            var argName = arg.name;
            var foundArgs = args.filter(function (arg) { return arg.name === argName; });
            if (foundArgs.length > 1) {
                duplicateArguments.push(arg);
            }
        };
        try {
            for (var args_1 = __values(args), args_1_1 = args_1.next(); !args_1_1.done; args_1_1 = args_1.next()) {
                var arg = args_1_1.value;
                _loop_1(arg);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (args_1_1 && !args_1_1.done && (_b = args_1.return)) _b.call(args_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (duplicateArguments.length > 0
            && allowDuplicateArgs === false) {
            throw new Error("Duplicate argument found: ".concat(duplicateArguments.map(function (arg) { return arg.name; }).join(", ")));
        }
        return true;
    };
    /**
     * Checks an array of parameters for duplicates.
     * - if duplicates are found and allowDuplicates is false, an error is thrown.
     * - if duplicates are found and allowDuplicates is true, the function returns true.
     */
    PocketConfiguration.checkForDuplicateParameters = function (_a) {
        var e_2, _b;
        var _c = _a.params, params = _c === void 0 ? [] : _c, _d = _a.allowDuplicateParams, allowDuplicateParams = _d === void 0 ? false : _d;
        var duplicateParameters = new Array();
        var _loop_2 = function (param) {
            var paramName = param.name;
            var foundParams = params.filter(function (param) { return param.name === paramName; });
            if (foundParams.length > 1) {
                duplicateParameters.push(param);
            }
        };
        try {
            for (var params_1 = __values(params), params_1_1 = params_1.next(); !params_1_1.done; params_1_1 = params_1.next()) {
                var param = params_1_1.value;
                _loop_2(param);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (params_1_1 && !params_1_1.done && (_b = params_1.return)) _b.call(params_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (duplicateParameters.length > 0
            && allowDuplicateParams === false) {
            throw new Error("Duplicate parameter found: ".concat(duplicateParameters.map(function (param) { return param.name; }).join(", ")));
        }
        return true;
    };
    /**
     * Checks if a parameter is valid.
     * - If the parameter is undefined, an error is thrown.
     * - If the parameter does not have a name, an error is thrown.
     * - If the parameter is valid, true is returned.
     */
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
     */
    PocketConfiguration.getParameterNameOrKey = function (param, toString) {
        if (toString === void 0) { toString = false; }
        var response = "";
        /**
         * The key of the parameter is returned if it is defined.
         */
        if (param.key !== undefined
            && Checks.isEmpty(param.key) === false) {
            response = param.key;
        }
        /**
         * The name of the parameter is returned if it is defined.
         */
        else if (param.name !== undefined
            && Checks.isEmpty(param.name) === false) {
            response = param.name;
        }
        if (toString === true
            && Checks.isEmpty(response) === false) {
            return String(response);
        }
        /**
         * An error is thrown if neither the key nor the name is defined.
         */
        else if (Checks.isEmpty(response) === true) {
            throw new Error("Parameter ".concat(param.nameString, " does not have a key or name."));
        }
        return response;
    };
    /**
     * Adds a parameter to the configuration.
     * - If the Configuration is frozen, a new PocketConfiguration object is returned.
     */
    PocketConfiguration.prototype.addParameter = function (param) {
        if (this.getOption('freeze') === true) {
            return new PocketConfiguration({
                args: this.arguments,
                params: __spreadArray(__spreadArray([], __read(this.parameters), false), [param], false),
                configuration: {
                    freeze: true,
                    allowDuplicateArgs: this.getOption('allowDuplicateArgs')
                }
            });
        }
        this.parameters.push(param);
        return this;
    };
    /**
     * Get an array of paramaters that are required.
     */
    PocketConfiguration.getRequiredParameters = function (_a) {
        var e_3, _b;
        var params = _a.params;
        var requiredParams = new Array();
        try {
            for (var params_2 = __values(params), params_2_1 = params_2.next(); !params_2_1.done; params_2_1 = params_2.next()) {
                var param = params_2_1.value;
                if (param.required === true) {
                    requiredParams.push(param);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (params_2_1 && !params_2_1.done && (_b = params_2.return)) _b.call(params_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return requiredParams;
    };
    /**
     * Get an array of paramaters that are not required.
     */
    PocketConfiguration.getOptionalParameters = function (_a) {
        var e_4, _b;
        var params = _a.params;
        var optionalParams = new Array();
        try {
            for (var params_3 = __values(params), params_3_1 = params_3.next(); !params_3_1.done; params_3_1 = params_3.next()) {
                var param = params_3_1.value;
                if (param.required === false) {
                    optionalParams.push(param);
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (params_3_1 && !params_3_1.done && (_b = params_3.return)) _b.call(params_3);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return optionalParams;
    };
    /**
     * Get an array of arguments from an array of parameters.
     * - The arguments are created from the default values of the parameters.
     * - The arguments are created with the name or key of the parameter (key takes precendence).
     */
    PocketConfiguration.getDefaultParameterValuesAsArguments = function (_a) {
        var e_5, _b;
        var params = _a.params, _c = _a.allowNonRequired, allowNonRequired = _c === void 0 ? false : _c;
        var defaultValuesAsArguments = new Array();
        try {
            for (var params_4 = __values(params), params_4_1 = params_4.next(); !params_4_1.done; params_4_1 = params_4.next()) {
                var param = params_4_1.value;
                if (allowNonRequired === true
                    && param.required === false) {
                    defaultValuesAsArguments.push(new PocketArgument({
                        name: PocketConfiguration.getParameterNameOrKey(param),
                        value: param.default,
                        configuration: {
                            allowEmpty: true,
                            freeze: true
                        }
                    }));
                }
                if (param.required === true) {
                    defaultValuesAsArguments.push(new PocketArgument({
                        name: PocketConfiguration.getParameterNameOrKey(param),
                        value: param.default,
                        configuration: {
                            allowEmpty: true,
                            freeze: true
                        }
                    }));
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (params_4_1 && !params_4_1.done && (_b = params_4.return)) _b.call(params_4);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return defaultValuesAsArguments;
    };
    /**
     * Get an argument by name from an array of arguments.
     */
    PocketConfiguration.getArgumentFromArray = function (_a) {
        var e_6, _b;
        var _c = _a.args, args = _c === void 0 ? [] : _c, name = _a.name;
        var foundArgs = Array();
        try {
            for (var args_2 = __values(args), args_2_1 = args_2.next(); !args_2_1.done; args_2_1 = args_2.next()) {
                var arg = args_2_1.value;
                if (arg.name === name) {
                    foundArgs.push(arg);
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (args_2_1 && !args_2_1.done && (_b = args_2.return)) _b.call(args_2);
            }
            finally { if (e_6) throw e_6.error; }
        }
        if (foundArgs.length > 0) {
            return foundArgs;
        }
        return undefined;
    };
    /**
     * Check if the argument value is valid according to the parameter.
     * - This involves checking if the value is included in the default or optional values.
     * - If the value is not valid, an error is thrown if throwError is true.
     * - If the value is valid, true is returned.
     * - If the value is not valid and throwError is false, false is returned.
     */
    PocketConfiguration.checkIfArgumentValueIsValidOrDefault = function (_a) {
        var arg = _a.arg, param = _a.param, _b = _a.throwError, throwError = _b === void 0 ? false : _b;
        var possibleValues = __spreadArray([param.default], __read(param.options), false);
        /**
         * Check if the argument value is valid according and included in either the default or optional values.
         *
         */
        if (arg.value !== undefined
            && Checks.isEmpty(arg.value) === false
            && param.options.length > 0
            && possibleValues.includes(arg.value) === false) {
            if (throwError === false) {
                return false;
            }
            throw new Error("Argument ".concat(arg.nameString, " is not a valid value. Possible values are: ").concat(possibleValues.join(", ")));
        }
        return true;
    };
    /**
     * Returns the required arguments from a set of PocketParameters and PocketArguments.
     */
    PocketConfiguration.getRequiredAndSetArguments = function (_a) {
        var e_7, _b, e_8, _c, e_9, _d;
        var _e = _a.args, args = _e === void 0 ? [] : _e, _f = _a.params, params = _f === void 0 ? [] : _f, _g = _a.includeAdditionalArgs, includeAdditionalArgs = _g === void 0 ? true : _g;
        var requiredParameters = PocketConfiguration.getRequiredParameters({ params: params });
        var requiredAndSetArgs = new Array();
        try {
            for (var requiredParameters_1 = __values(requiredParameters), requiredParameters_1_1 = requiredParameters_1.next(); !requiredParameters_1_1.done; requiredParameters_1_1 = requiredParameters_1.next()) {
                var requiredParameter = requiredParameters_1_1.value;
                var passedArgs = PocketConfiguration.getArgumentFromArray({ args: args, name: PocketConfiguration.getParameterNameOrKey(requiredParameter) });
                if (passedArgs !== undefined && passedArgs.length > 0) {
                    try {
                        for (var passedArgs_1 = (e_8 = void 0, __values(passedArgs)), passedArgs_1_1 = passedArgs_1.next(); !passedArgs_1_1.done; passedArgs_1_1 = passedArgs_1.next()) {
                            var foundArg = passedArgs_1_1.value;
                            if (foundArg.value !== undefined) {
                                requiredAndSetArgs.push(foundArg);
                            }
                            else {
                                requiredAndSetArgs.push(new PocketArgument({
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
                    catch (e_8_1) { e_8 = { error: e_8_1 }; }
                    finally {
                        try {
                            if (passedArgs_1_1 && !passedArgs_1_1.done && (_c = passedArgs_1.return)) _c.call(passedArgs_1);
                        }
                        finally { if (e_8) throw e_8.error; }
                    }
                }
                else {
                    requiredAndSetArgs.push(new PocketArgument({
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
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (requiredParameters_1_1 && !requiredParameters_1_1.done && (_b = requiredParameters_1.return)) _b.call(requiredParameters_1);
            }
            finally { if (e_7) throw e_7.error; }
        }
        var _loop_3 = function (arg) {
            var param = params.find(function (param) { return PocketConfiguration.getParameterNameOrKey(param) === arg.name; });
            if (param === undefined
                && Checks.isEmpty(arg.value) === false
                && Checks.isEmpty(arg.name) === false
                && includeAdditionalArgs === true) {
                requiredAndSetArgs.push(arg);
            }
        };
        try {
            for (var args_3 = __values(args), args_3_1 = args_3.next(); !args_3_1.done; args_3_1 = args_3.next()) {
                var arg = args_3_1.value;
                _loop_3(arg);
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (args_3_1 && !args_3_1.done && (_d = args_3.return)) _d.call(args_3);
            }
            finally { if (e_9) throw e_9.error; }
        }
        return requiredAndSetArgs;
    };
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
    PocketConfiguration.prototype.preparedArgs = function (_a) {
        var e_10, _b;
        var _c = _a === void 0 ? {} : _a, _d = _c.allowAdditionalArgs, allowAdditionalArgs = _d === void 0 ? true : _d, _e = _c.allowNonRequired, allowNonRequired = _e === void 0 ? false : _e;
        var preparedArgs = PocketConfiguration.getRequiredAndSetArguments({
            args: this.arguments,
            params: this.parameters
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
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (preparedArgs_1_1 && !preparedArgs_1_1.done && (_b = preparedArgs_1.return)) _b.call(preparedArgs_1);
            }
            finally { if (e_10) throw e_10.error; }
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