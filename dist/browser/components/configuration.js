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
import { PocketArgument } from "./argument";
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
    }
    PocketConfiguration.getNameOrKey = function (_a) {
        var param = _a.param;
        if (param.key) {
            return param.key;
        }
        else if (param.name) {
            return param.name;
        }
        else {
            throw new Error("Parameter ".concat(param.name, " does not have a key or name."));
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
        var e_5, _b;
        var args = _a.args, params = _a.params, _c = _a.allowAdditionalArgs, allowAdditionalArgs = _c === void 0 ? true : _c;
        var argRecords = new Array();
        var _loop_2 = function (arg) {
            var _d;
            // Check if the argument has a corresponding parameter
            var param = params.find(function (param) { return PocketConfiguration.getNameOrKey({ param: param }) === arg.name; });
            if (param === undefined
                && allowAdditionalArgs === false) {
                throw new Error("Argument ".concat(arg.nameString, " does not have a corresponding parameter and additional arguments are not allowed."));
            }
            // Check if the argument value is valid
            if (param !== undefined
                && param.required === true
                && param.default === undefined
                && arg.value === undefined) {
                throw new Error("Argument ".concat(arg.nameString, " is required but has no value."));
            }
            // append the argument record
            argRecords.push((_d = {},
                _d[arg.name] = arg.value,
                _d));
        };
        try {
            for (var args_1 = __values(args), args_1_1 = args_1.next(); !args_1_1.done; args_1_1 = args_1.next()) {
                var arg = args_1_1.value;
                _loop_2(arg);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (args_1_1 && !args_1_1.done && (_b = args_1.return)) _b.call(args_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return argRecords;
    };
    return PocketConfiguration;
}());
export { PocketConfiguration };
//# sourceMappingURL=configuration.js.map