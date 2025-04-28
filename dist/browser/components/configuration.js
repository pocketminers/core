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
import { PocketArgument } from "./argument.js";
import { Freezer } from "../utilities/freezer.js";
import { Checks } from "../utilities/checks.js";
/**
 * PocketConfiguration is a generic type that represents a configuration object.
 */
var PocketConfiguration = /** @class */ (function () {
    /**
     * The constructor for the PocketConfiguration class.
     *
     * @param arguments_ - The arguments for the configuration.
     * @param parameters_ - The parameters for the configuration.
     */
    function PocketConfiguration(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.args, args = _c === void 0 ? [] : _c, _d = _b.params, params = _d === void 0 ? [] : _d;
        this.arguments = args;
        this.parameters = params;
        // Freeze the object to make it immutable
        Freezer.deepFreeze(this);
    }
    PocketConfiguration.getNameOrKey = function (_a) {
        var param = _a.param;
        if (param.key) {
            return param.key;
        }
        else if (param.nameString !== undefined
            && Checks.isEmpty(param.nameString) === false) {
            return param.name;
        }
        else {
            throw new Error("Parameter ".concat(param.nameString, " does not have a key or name."));
        }
    };
    PocketConfiguration.getRequiredParameters = function (_a) {
        var e_1, _b;
        var params = _a.params;
        // Check if the arguments and parameters are valid
        var requiredParams = new Array();
        try {
            for (var params_1 = __values(params), params_1_1 = params_1.next(); !params_1_1.done; params_1_1 = params_1.next()) {
                var param = params_1_1.value;
                if (param.required) {
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
        // Check if the arguments and parameters are valid
        var optionalParams = new Array();
        try {
            for (var params_2 = __values(params), params_2_1 = params_2.next(); !params_2_1.done; params_2_1 = params_2.next()) {
                var param = params_2_1.value;
                if (!param.required) {
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
        // Check if the arguments and parameters are valid
        var defaultRequiredParams = PocketConfiguration.getRequiredParameters({ params: params });
        var defaultRequiredParamValues = new Array();
        try {
            // const missingDefaultRequiredParams = new Array<PocketParameter>();
            for (var defaultRequiredParams_1 = __values(defaultRequiredParams), defaultRequiredParams_1_1 = defaultRequiredParams_1.next(); !defaultRequiredParams_1_1.done; defaultRequiredParams_1_1 = defaultRequiredParams_1.next()) {
                var param = defaultRequiredParams_1_1.value;
                var defaultValue = param.default;
                if (defaultValue) {
                    defaultRequiredParamValues.push(new PocketArgument({
                        name: PocketConfiguration.getNameOrKey({ param: param }),
                        value: defaultValue
                    }));
                }
                else {
                    defaultRequiredParamValues.push(new PocketArgument({
                        name: PocketConfiguration.getNameOrKey({ param: param }),
                        value: undefined
                    }));
                }
                // else {
                //     missingDefaultRequiredParams.push(param);
                // }
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
    PocketConfiguration.getRequiredArguments = function (_a) {
        var e_4, _b;
        var args = _a.args, params = _a.params;
        var requiredParams = PocketConfiguration.getRequiredParameters({ params: params });
        var missingRequiredParams = new Array();
        var arguments_ = new Array();
        var _loop_1 = function (param) {
            var arg = args.find(function (arg) { return arg.name === PocketConfiguration.getNameOrKey({ param: param }); });
            if (arg) {
                arguments_.push(arg);
            }
            else if (param.default !== undefined) {
                arguments_.push(new PocketArgument({
                    name: PocketConfiguration.getNameOrKey({ param: param }),
                    value: param.default
                }));
            }
            else {
                missingRequiredParams.push(param);
            }
        };
        try {
            for (var requiredParams_1 = __values(requiredParams), requiredParams_1_1 = requiredParams_1.next(); !requiredParams_1_1.done; requiredParams_1_1 = requiredParams_1.next()) {
                var param = requiredParams_1_1.value;
                _loop_1(param);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (requiredParams_1_1 && !requiredParams_1_1.done && (_b = requiredParams_1.return)) _b.call(requiredParams_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        if (missingRequiredParams.length > 0) {
            throw new Error("Missing required parameters: ".concat(missingRequiredParams.map(function (param) { return param.name; }).join(", ")));
        }
        return arguments_;
    };
    PocketConfiguration.getArgRecords = function (_a) {
        var e_5, _b, e_6, _c, e_7, _d;
        var args = _a.args, params = _a.params, _e = _a.allowAdditionalArgs, allowAdditionalArgs = _e === void 0 ? true : _e, _f = _a.allowNonRequired, allowNonRequired = _f === void 0 ? false : _f;
        var argRecords = new Array();
        if (args === undefined) {
            args = new Array();
        }
        var _loop_2 = function (param) {
            var _g, _h, _j, _k;
            var arg = args.find(function (arg) { return arg.name === PocketConfiguration.getNameOrKey({ param: param }); });
            // Check if an argument is required and defined either in the argument or parameter
            if (arg !== undefined
                && param.required === true
                && param.default === undefined
                && arg.value === undefined) {
                throw new Error("Argument ".concat(arg.nameString, " is required but has no value."));
            }
            else if (arg !== undefined
                && param.required === true
                && param.default === undefined
                && arg.value !== undefined
                && Checks.isEmpty(arg.value) === false) {
                argRecords.push((_g = {},
                    _g[PocketConfiguration.getNameOrKey({ param: param })] = arg.value,
                    _g));
            }
            else if (param.required === true
                && param.default !== undefined) {
                argRecords.push((_h = {},
                    _h[PocketConfiguration.getNameOrKey({ param: param })] = param.default,
                    _h));
            }
            else if (param.required === false
                && param.default !== undefined
                && allowNonRequired === true) {
                argRecords.push((_j = {},
                    _j[PocketConfiguration.getNameOrKey({ param: param })] = param.default,
                    _j));
            }
            else if (param.required === false
                && arg !== undefined
                && arg.value !== undefined
                && Checks.isEmpty(arg.value) === false
                && allowNonRequired === true) {
                argRecords.push((_k = {},
                    _k[PocketConfiguration.getNameOrKey({ param: param })] = arg.value,
                    _k));
            }
        };
        try {
            for (var params_3 = __values(params), params_3_1 = params_3.next(); !params_3_1.done; params_3_1 = params_3.next()) {
                var param = params_3_1.value;
                _loop_2(param);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (params_3_1 && !params_3_1.done && (_b = params_3.return)) _b.call(params_3);
            }
            finally { if (e_5) throw e_5.error; }
        }
        if (allowAdditionalArgs === true) {
            var _loop_3 = function (arg) {
                var _l;
                // Check if the argument has a corresponding parameter
                var param = params.find(function (param) { return PocketConfiguration.getNameOrKey({ param: param }) === arg.name; });
                if (param === undefined
                    && allowAdditionalArgs === true) {
                    argRecords.push((_l = {},
                        _l[arg.name] = arg.value,
                        _l));
                }
            };
            try {
                for (var args_1 = __values(args), args_1_1 = args_1.next(); !args_1_1.done; args_1_1 = args_1.next()) {
                    var arg = args_1_1.value;
                    _loop_3(arg);
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (args_1_1 && !args_1_1.done && (_c = args_1.return)) _c.call(args_1);
                }
                finally { if (e_6) throw e_6.error; }
            }
        }
        var requiredParams = PocketConfiguration.getRequiredParameters({ params: params });
        var missingRequiredParams = new Array();
        var _loop_4 = function (param) {
            var arg = argRecords.find(function (argRecord) { return argRecord[PocketConfiguration.getNameOrKey({ param: param })] !== undefined; });
            if (arg === undefined) {
                missingRequiredParams.push(param);
            }
        };
        try {
            for (var requiredParams_2 = __values(requiredParams), requiredParams_2_1 = requiredParams_2.next(); !requiredParams_2_1.done; requiredParams_2_1 = requiredParams_2.next()) {
                var param = requiredParams_2_1.value;
                _loop_4(param);
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (requiredParams_2_1 && !requiredParams_2_1.done && (_d = requiredParams_2.return)) _d.call(requiredParams_2);
            }
            finally { if (e_7) throw e_7.error; }
        }
        if (missingRequiredParams.length > 0) {
            throw new Error("Missing required parameters: ".concat(missingRequiredParams.map(function (param) { return param.name; }).join(", ")));
        }
        return argRecords;
    };
    PocketConfiguration.prototype.preparedArgs = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.allowAdditionalArgs, allowAdditionalArgs = _c === void 0 ? true : _c, _d = _b.allowNonRequired, allowNonRequired = _d === void 0 ? false : _d;
        return PocketConfiguration.getArgRecords({
            args: this.arguments,
            params: this.parameters,
            allowAdditionalArgs: allowAdditionalArgs,
            allowNonRequired: allowNonRequired
        });
    };
    PocketConfiguration.prototype.getPreparedArgByName = function (name) {
        var e_8, _a;
        var preparedArgs = this.preparedArgs({ allowNonRequired: true });
        try {
            for (var preparedArgs_1 = __values(preparedArgs), preparedArgs_1_1 = preparedArgs_1.next(); !preparedArgs_1_1.done; preparedArgs_1_1 = preparedArgs_1.next()) {
                var arg = preparedArgs_1_1.value;
                if (arg[name] !== undefined) {
                    return new PocketArgument({
                        name: name,
                        value: arg[name]
                    });
                }
                // console.log(`arg: ${JSON.stringify(arg)}`);
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (preparedArgs_1_1 && !preparedArgs_1_1.done && (_a = preparedArgs_1.return)) _a.call(preparedArgs_1);
            }
            finally { if (e_8) throw e_8.error; }
        }
        // if (arg) {
        //     return new PocketArgument<T>({
        //         name: name,
        //         value: arg.
        //     });
        // }
        return undefined;
    };
    return PocketConfiguration;
}());
export { PocketConfiguration };
//# sourceMappingURL=configuration.js.map