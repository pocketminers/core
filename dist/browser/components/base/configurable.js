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
var Configurable = /** @class */ (function () {
    function Configurable(configuration, prototype) {
        if (configuration === void 0) { configuration = {}; }
        if (prototype === void 0) { prototype = Object.getPrototypeOf(Configurable.prototype); }
        this.configuration = __assign(__assign({}, Configurable.defaultOptions), configuration);
        this.initializeConfigurable(prototype);
    }
    Configurable.prototype.initializeConfigurable = function (overridePrototype) {
        if (overridePrototype === undefined) {
            overridePrototype = Object.getPrototypeOf(this);
        }
        // Override the prototype with the provided one
        Object.setPrototypeOf(this, overridePrototype);
        // Initialization logic can be added here if needed
    };
    Configurable.prototype.addOption = function (key, value) {
        this.configuration[key] = value;
        return this;
    };
    Configurable.prototype.getOption = function (key) {
        return this.configuration[key];
    };
    Configurable.prototype.getOptions = function () {
        return this.configuration;
    };
    Configurable.prototype.setOptions = function (options) {
        this.configuration = __assign(__assign({}, this.configuration), options);
        return this;
    };
    Configurable.prototype.removeOption = function (key) {
        delete this.configuration[key];
        return this;
    };
    Configurable.prototype.hasOption = function (key) {
        return this.configuration.hasOwnProperty(key);
    };
    Configurable.prototype.clearOptions = function () {
        this.configuration = {};
        return this;
    };
    Configurable.prototype.isEmpty = function () {
        return Object.keys(this.configuration).length === 0;
    };
    Configurable.prototype.toJSON = function () {
        return JSON.stringify(this.configuration);
    };
    Configurable.prototype.toString = function () {
        return JSON.stringify(this.configuration, null, 2);
    };
    Configurable.fromJSON = function (json) {
        return new Configurable(JSON.parse(json));
    };
    Configurable.fromString = function (str) {
        return new Configurable(JSON.parse(str));
    };
    Configurable.fromRecords = function (records) {
        var e_1, _a;
        var options = {};
        try {
            for (var records_1 = __values(records), records_1_1 = records_1.next(); !records_1_1.done; records_1_1 = records_1.next()) {
                var record = records_1_1.value;
                for (var key in record) {
                    options[key] = record[key];
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (records_1_1 && !records_1_1.done && (_a = records_1.return)) _a.call(records_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return new Configurable(options);
    };
    Configurable.defaultOptions = {};
    return Configurable;
}());
export { Configurable };
//# sourceMappingURL=configurable.js.map