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
import { Checks } from "../../utilities/checks.js";
import { Immuteable } from "./immuteable.js";
/**
 * PocketParameter is a class that represents a parameter object.
 * - It is used to encapsulate parameters in the Pocket framework.
 * - The class is generic and can be used with different types of values.
 * - This class does not extend the PocketObject class, as it does
 *   not include a metadata object.
 * - This class is designed to be immutable after creation.
 *
 * @template T - The type of the value. It can be any type.
 *
 * @example
 * const param = new PocketParameter({
 *   name: "param1",
 *   key: "param1",
 *   description: "This is a parameter",
 *   default: "defaultOption",
 *   required: true,
 *   options: ["option1", "option2"]
 * });
 * console.log(param.nameString); // Output: "param1"
 * console.log(param.checkValue("option1")); // Output: true
 */
var PocketParameter = /** @class */ (function (_super) {
    __extends(PocketParameter, _super);
    /**
     * The constructor initializes the name, description, default value, required flag, and options list.
     * - If the name is empty, it throws an error.
     */
    function PocketParameter(_a) {
        var name = _a.name, _b = _a.key, key = _b === void 0 ? "" : _b, _c = _a.description, description = _c === void 0 ? "" : _c, _d = _a.default, defaultValue = _d === void 0 ? undefined : _d, _e = _a.required, required = _e === void 0 ? false : _e, _f = _a.options, options = _f === void 0 ? [] : _f, _g = _a.configuration, _h = _g === void 0 ? {
            freeze: true,
            allowEmpty: false
        } : _g, freeze = _h.freeze, allowEmpty = _h.allowEmpty;
        var _this = this;
        if (Checks.isEmpty(name) == true) {
            throw new Error("Name is required");
        }
        if (Checks.isEmpty(key) == true) {
            key = name;
        }
        _this = _super.call(this, {
            freeze: freeze,
            allowEmpty: allowEmpty
        }, PocketParameter.prototype) || this;
        _this.name = name;
        _this.key = key;
        _this.description = description;
        _this.default = defaultValue;
        _this.required = required;
        _this.options = options;
        _this.initializeImmuteable({
            force: true
        });
        return _this;
    }
    Object.defineProperty(PocketParameter.prototype, "nameString", {
        /**
         * Returns the name of the parameter as a string.
         *
         * @returns {string} - The name of the parameter.
         */
        get: function () {
            return String(this.name);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PocketParameter.prototype, "keyString", {
        /**
         * Returns the key of the parameter as a string.
         *
         * @returns {string} - The key of the parameter.
         */
        get: function () {
            return String(this.key);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Checks if the provided value is valid according to the parameter's rules.
     * - If the value is required and empty, it throws an error.
     * - If the value is not in the options list and not equal to the default value, it throws an error.
     *
     * @param {BaseValue<T> | undefined} value - The value to check.
     * @returns {boolean} - Returns true if the value is valid, otherwise throws an error.
     */
    PocketParameter.prototype.checkValue = function (value) {
        if (this.required == true
            && Checks.isEmpty(value) == true) {
            throw new Error("Parameter ".concat(this.nameString, " is required"));
        }
        if (this.options.length > 0
            && Checks.isEmpty(value) == false
            && Checks.isEmpty(this.options) == false
            && Checks.isEmpty(this.options.find(function (option) { return option == value; })) == true
            && !this.options.includes(value)
            && !this.default === value) {
            throw new Error("Parameter ".concat(this.nameString, " must be one of ").concat(this.options.join(", "), " or ").concat(this.default, ", but got ").concat(value));
        }
        return true;
    };
    /**
     * Returns the value if it is not empty, otherwise returns the default value.
     *
     * @param {BaseValue<T> | undefined} value - The value to check.
     * @returns {BaseValue<T> | undefined} - The value or the default value if the value is empty.
     */
    PocketParameter.prototype.getValueOrDefault = function (value) {
        if (Checks.isEmpty(value) == true
            && this.checkValue(value) == false
            && Checks.isEmpty(this.default) == false) {
            return this.default;
        }
        return value;
    };
    /**
     * Returns the value if it is not empty, otherwise returns the default value or the first option.
     *
     * @param {BaseValue<T> | undefined} value - The value to check.
     * @returns {BaseValue<T> | undefined} - The value, default value, or first option if the value is empty.
     */
    PocketParameter.prototype.getValueOrDefaultOrOptions = function (value) {
        var result = value;
        result = this.getValueOrDefault(value);
        if (Checks.isEmpty(result) == true
            && Checks.isEmpty(this.options) == false) {
            result = this.options[0];
        }
        return result;
    };
    return PocketParameter;
}(Immuteable));
export { PocketParameter };
//# sourceMappingURL=parameter.js.map