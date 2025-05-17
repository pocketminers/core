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
import { Checks } from "../../utilities/checks.js";
import { Immuteable } from "../base/immuteable.js";
/**
 * PocketArgument is a class that represents a key-value pair.
 * - It is used to encapsulate arguments in the Pocket framework.
 * - The class is generic and can be used with different types of values.
 * - This class does not extend the PocketObject class, as it does not include a metadata object.
 * - This class is designed to be immutable after creation, but can be left unfrozen by setting the 'freeze' option.
 * - The class includes methods for creating PocketArgument objects from strings, records, key-value pairs, and JSON.
 *
 * @template T - The type of the value. It can be any type.
 *
 * @example
 * const arg = new PocketArgument({
 *     name: "arg1",
 *    value: "value1"
 * });
 * console.log(arg.toString()); // Output: "arg1: value1"
 */
var PocketArgument = /** @class */ (function (_super) {
    __extends(PocketArgument, _super);
    /**
     * The constructor initializes the name and value properties with the provided arguments.
     * If the name or value is empty, it throws an error.
     *
     * @param name - The name of the argument.
     * @param value - The value of the argument.
     * @param configuration - Optional settings for the argument.
     */
    function PocketArgument(_a) {
        var name = _a.name, value = _a.value, _b = _a.configuration, _c = _b === void 0 ? {
            freeze: PocketArgument.defaultOptions.freeze !== undefined ? PocketArgument.defaultOptions.freeze : true,
            allowEmpty: PocketArgument.defaultOptions.allowEmpty !== undefined ? PocketArgument.defaultOptions.allowEmpty : true
        } : _b, freeze = _c.freeze, allowEmpty = _c.allowEmpty;
        var _this = this;
        // Check if the argument is valid
        PocketArgument.checkIfValid({
            name: name,
            value: value,
            configuration: {
                freeze: freeze !== undefined ? freeze : PocketArgument.defaultOptions.freeze,
                allowEmpty: allowEmpty !== undefined ? allowEmpty : PocketArgument.defaultOptions.allowEmpty
            }
        });
        _this = _super.call(this, { freeze: freeze, allowEmpty: allowEmpty }, PocketArgument.prototype) || this;
        _this.name = name;
        _this.value = value;
        _this.initializeImmuteable({ force: true });
        return _this;
    }
    Object.defineProperty(PocketArgument.prototype, "nameString", {
        get: function () {
            return String(this.name);
        },
        enumerable: false,
        configurable: true
    });
    PocketArgument.checkIfValid = function (_a) {
        var name = _a.name, value = _a.value, _b = _a.configuration, _c = _b === void 0 ? {
            freeze: PocketArgument.defaultOptions.freeze !== undefined ? PocketArgument.defaultOptions.freeze : true,
            allowEmpty: PocketArgument.defaultOptions.allowEmpty !== undefined ? PocketArgument.defaultOptions.allowEmpty : true
        } : _b, freeze = _c.freeze, allowEmpty = _c.allowEmpty;
        if (name === undefined
            || name === null) {
            throw new Error("Name is required");
        }
        if (allowEmpty == false
            && Checks.isEmpty(value) == true) {
            throw new Error("Value for the ".concat(String(name), " argument is required because allowEmpty is false"));
        }
        return true;
    };
    /**
     * Creates a PocketArgument from a string.
     * Expects the string to be in the format "name=value", "name:value", or JSON.
     */
    PocketArgument.fromString = function (str) {
        if (str === undefined
            || Checks.isEmpty(str) == true
            || Checks.isEmpty(str.trim()) == true
            || str.trim().length === 0) {
            throw new Error("String is required");
        }
        var parsed;
        try {
            if (str.startsWith("{")
                && str.endsWith("}")) {
                // Check if the string is in JSON format
                parsed = JSON.parse(str);
            }
            else if (str.includes("=")) {
                // If the string contains "=", split it into key-value pair
                var _a = __read(str.split("=").map(function (part) { return part.trim(); }), 2), name_1 = _a[0], value = _a[1];
                parsed = {
                    name: name_1,
                    value: value
                };
            }
            else if (str.includes(":")) {
                // If the string contains ":", split it into key-value pair
                var _b = __read(str.split(":").map(function (part) { return part.trim(); }), 2), name_2 = _b[0], value = _b[1];
                parsed = {
                    name: name_2,
                    value: value
                };
            }
            else {
                throw new Error("Invalid string format");
            }
        }
        catch (error) {
            throw new Error("Invalid string format for deserialization " + error.message);
        }
        if (parsed.name === undefined || parsed.name === null) {
            throw new Error("Name is required in the serialized string");
        }
        if (parsed.value === undefined) {
            throw new Error("Value is required in the serialized string");
        }
        return new PocketArgument({
            name: parsed.name,
            value: parsed.value
        });
    };
    /**
     * Creates a PocketArgument from a record.
     * Expects the record to contain only one key-value pair.
     */
    PocketArgument.fromRecord = function (record) {
        if (record === undefined) {
            throw new Error("Record is required");
        }
        if (Object.keys(record).length === 0) {
            throw new Error("Record is empty");
        }
        if (Object.keys(record).length > 1) {
            throw new Error("Record must contain only one key-value pair");
        }
        var name = Object.keys(record)[0];
        var value = record[name];
        return new PocketArgument({
            name: name,
            value: value
        });
    };
    /**
     * Creates a PocketArgument from a key-value pair.
     * Expects the key-value pair to be an array of two elements.
     */
    PocketArgument.fromKeyValuePair = function (keyValuePair) {
        if (keyValuePair === undefined) {
            throw new Error("Key-value pair is required");
        }
        if (keyValuePair.length !== 2) {
            throw new Error("Key-value pair must contain exactly two elements");
        }
        var _a = __read(keyValuePair, 2), name = _a[0], value = _a[1];
        return new PocketArgument({
            name: name,
            value: value
        });
    };
    /**
     * Creates a PocketArgument from a JSON string.
     * - Expects the JSON string to be in the format { "name": "key", "value": "value" }.
     *
     * @example
     * const json = '{"name":"arg1","value":"value1"}';
     * const arg = PocketArgument.fromJSON(json);
     * console.log(arg.toString()); // Output: "arg1: value1"
     */
    PocketArgument.fromJSON = function (json) {
        var parsed;
        if (Checks.isEmpty(json) == true) {
            throw new Error("JSON string is required");
        }
        try {
            parsed = JSON.parse(json);
        }
        catch (error) {
            throw new Error("Invalid JSON string");
        }
        var name = parsed.name;
        var value = parsed.value;
        var configuration = parsed.configuration;
        return new PocketArgument({
            name: name,
            value: value,
            configuration: configuration
        });
    };
    /**
     * Creates a PocketArgument from an object.
     * - Expects the object to contain a name and value property.
     *
     * @example
     * const obj = {
     *    name: "arg1",
     *    value: "value1"
     * };
     * const arg = PocketArgument.fromObject(obj);
     * console.log(arg.toString()); // Output: "arg1: value1"
     */
    PocketArgument.fromObject = function (obj) {
        if (obj === undefined) {
            throw new Error("Object is required");
        }
        if (obj.name === undefined) {
            throw new Error("Name is required");
        }
        if (obj.value === undefined) {
            throw new Error("Value is required");
        }
        return new PocketArgument({
            name: obj.name,
            value: obj.value
        });
    };
    /**
     * Returns a JSON string representation of the PocketArgument object.
     * @example
     * const arg = new PocketArgument({
     *    name: "arg1",
     *    value: "value1"
     * });
     * console.log(arg.toJSON()); // Output: '{"name":"arg1","value":"value1"}'
     */
    PocketArgument.prototype.toJSON = function () {
        return JSON.stringify({
            name: this.name,
            value: this.value
        });
    };
    /**
     * Returns a string representation of the PocketArgument object.
     * @example
     * const arg = new PocketArgument({
     *    name: "arg1",
     *    value: "value1"
     * });
     * console.log(arg.toString()); // Output: "arg1: value1"
     */
    PocketArgument.prototype.toString = function () {
        return "".concat(String(this.name), ": ").concat(this.value);
    };
    /**
     * Returns an object representation of the PocketArgument object.
     * @example
     * const arg = new PocketArgument({
     *   name: "arg1",
     *   value: "value1"
     * });
     * console.log(arg.toObject()); // Output: { name: "arg1", value: "value1" }
     */
    PocketArgument.prototype.toObject = function () {
        return {
            name: this.name,
            value: this.value
        };
    };
    /**
     * Returns a record representation of the PocketArgument object.
     * @example
     * const arg = new PocketArgument({
     *   name: "arg1",
     *   value: "value1"
     * });
     * console.log(arg.toRecord()); // Output: { arg1: "value1" }
     */
    PocketArgument.prototype.toRecord = function () {
        var _a;
        return _a = {},
            _a[this.name] = this.value,
            _a;
    };
    /**
     * Returns a key-value pair representation of the PocketArgument object.
     * @example
     * const arg = new PocketArgument({
     *   name: "arg1",
     *   value: "value1"
     * });
     * console.log(arg.toKeyValuePair()); // Output: ["arg1", "value1"]
     */
    PocketArgument.prototype.toKeyValuePair = function () {
        return [this.name, this.value];
    };
    PocketArgument.defaultOptions = __assign(__assign({}, Immuteable.defaultOptions), { allowEmpty: false });
    return PocketArgument;
}(Immuteable));
export { PocketArgument };
//# sourceMappingURL=argument.js.map