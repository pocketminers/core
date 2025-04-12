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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { Parameter } from "./parameter.js";
import { Argument } from "./argument.js";
import { BaseObjectTypes, BaseStorageLocations } from "../../templates/v0/index.js";
import { PocketStorage } from "../base/index.js";
import { Checks } from "../../utilities/checks.js";
/**
 * Properties is a class that represents a storage object for arguments and parameters.
 * It extends the PocketStorage class and provides methods to manage the storage.
 */
var Properties = /** @class */ (function (_super) {
    __extends(Properties, _super);
    function Properties(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.items, items = _c === void 0 ? [] : _c;
        return _super.call(this, items, {
            location: BaseStorageLocations.MEMORY,
            allowDuplicates: true,
            allowEmpty: true,
            maxSize: 0
        }) || this;
    }
    Properties.prototype.getArgument = function (name) {
        var args = this.arguments;
        var arg = args.find(function (arg) { return arg.name === name; });
        // if (!arg) {
        //     throw new Error(`Argument "${String(name)}" not found.`);
        // }
        return arg;
    };
    Properties.prototype.getParameter = function (name) {
        var params = this.parameters;
        var param = params.find(function (param) { return param.name === name; });
        // if (!param) {
        //     throw new Error(`Parameter "${String(name)}" not found.`);
        // }
        return param;
    };
    Properties.prototype.getDefaultFromParameter = function (name, useOptional) {
        if (useOptional === void 0) { useOptional = false; }
        var param = this.getParameter(name);
        if (!param) {
            return undefined;
        }
        var metadata = param.metadata;
        var defultValue = param.default;
        var optionalValues = param.optional;
        var value = Checks.isEmpty(defultValue) === false ? defultValue : null;
        if (useOptional === true
            && Checks.isEmpty(defultValue) === true
            && Checks.isEmpty(optionalValues) === false
            && optionalValues.length > 0) {
            value = optionalValues[0];
        }
        if (Checks.isEmpty(defultValue) === true
            && Checks.isEmpty(optionalValues) === true) {
            return undefined;
        }
        if (Checks.isEmpty(defultValue) === false) {
            return new Argument({
                name: param.name,
                value: defultValue,
                meta: __assign(__assign({}, metadata), { type: BaseObjectTypes.Argument })
            });
        }
    };
    Properties.prototype.convertArgumentFromParameter = function (name) {
        var param = this.getParameter(name);
        if (!param) {
            return undefined;
        }
        var metadata = param.metadata;
        var defultValue = param.default;
        var optionalValues = param.optional;
        var arg = new Argument({
            name: param.name,
            value: Checks.isEmpty(param.default) === false ? param.default : null,
            meta: __assign(__assign({}, metadata), { type: BaseObjectTypes.Argument })
        });
    };
    Object.defineProperty(Properties.prototype, "arguments", {
        get: function () {
            return this.items.filter(function (item) { return item instanceof Argument; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Properties.prototype, "parameters", {
        get: function () {
            return this.items.filter(function (item) { return item instanceof Parameter; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Properties.prototype, "keysFromArgs", {
        get: function () {
            return this.arguments.map(function (arg) { return arg.name; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Properties.prototype, "keysFromParams", {
        get: function () {
            return this.parameters.map(function (param) { return param.name; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Properties.prototype, "requiredKeys", {
        get: function () {
            var e_1, _a;
            var params = this.parameters;
            var requiredKeys = [];
            try {
                for (var params_1 = __values(params), params_1_1 = params_1.next(); !params_1_1.done; params_1_1 = params_1.next()) {
                    var param = params_1_1.value;
                    if (param.required) {
                        requiredKeys.push(param.name);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (params_1_1 && !params_1_1.done && (_a = params_1.return)) _a.call(params_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return requiredKeys;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Properties.prototype, "missingArgs", {
        get: function () {
            var e_2, _a;
            var requiredKeys = this.requiredKeys;
            var args = this.arguments;
            var missingArgs = [];
            var _loop_1 = function (key) {
                if (!args.find(function (arg) { return arg.name === key; })) {
                    missingArgs.push(key);
                }
            };
            try {
                for (var requiredKeys_1 = __values(requiredKeys), requiredKeys_1_1 = requiredKeys_1.next(); !requiredKeys_1_1.done; requiredKeys_1_1 = requiredKeys_1.next()) {
                    var key = requiredKeys_1_1.value;
                    _loop_1(key);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (requiredKeys_1_1 && !requiredKeys_1_1.done && (_a = requiredKeys_1.return)) _a.call(requiredKeys_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return missingArgs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Properties.prototype, "defaultParams", {
        get: function () {
            var e_3, _a;
            var params = this.parameters;
            var defaultParams = [];
            try {
                for (var params_2 = __values(params), params_2_1 = params_2.next(); !params_2_1.done; params_2_1 = params_2.next()) {
                    var param = params_2_1.value;
                    if (Checks.isEmpty(param.default) === false
                        && param.default === true) {
                        defaultParams.push(param);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (params_2_1 && !params_2_1.done && (_a = params_2.return)) _a.call(params_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return defaultParams;
        },
        enumerable: false,
        configurable: true
    });
    Properties.prototype.getValue = function (name) {
        var arg = this.getArgument(name);
        if (arg) {
            return arg;
        }
        var param = this.getParameter(name);
        if (param) {
            var metadata = param.metadata;
        }
    };
    Object.defineProperty(Properties.prototype, "values", {
        get: function () {
            var e_4, _a;
            var args = this.arguments;
            var params = this.parameters;
            var values = [];
            var _loop_2 = function (param) {
                var arg = args.find(function (arg) { return arg.name === param.name; });
                if (arg) {
                    values.push(arg);
                }
                else {
                    var metadata = param.metadata;
                    var value = param.default;
                    values.push(new Argument({
                        name: param.name,
                        value: param.default !== undefined
                            ? param.default
                            : param.optional && param.optional.length > 0
                                ? param.optional[0]
                                : null,
                        meta: __assign(__assign({}, metadata), { type: BaseObjectTypes.Argument })
                    }));
                }
            };
            try {
                for (var params_3 = __values(params), params_3_1 = params_3.next(); !params_3_1.done; params_3_1 = params_3.next()) {
                    var param = params_3_1.value;
                    _loop_2(param);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (params_3_1 && !params_3_1.done && (_a = params_3.return)) _a.call(params_3);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return values;
        },
        enumerable: false,
        configurable: true
    });
    return Properties;
}(PocketStorage));
export { Properties };
//# sourceMappingURL=properties.storage.js.map