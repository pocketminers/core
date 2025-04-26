import { Checks } from "../utilities/checks.js";
import { Freezer } from "../utilities/freezer.js";
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
 *   description: "This is a parameter",
 *   default: "defaultOption",
 *   required: true,
 *   options: ["option1", "option2"]
 * });
 * console.log(param.nameString); // Output: "param1"
 * console.log(param.checkValue("option1")); // Output: true
 */
var PocketParameter = /** @class */ (function () {
    /**
     * The constructor initializes the name, description, default value, required flag, and options list.
     * - If the name is empty, it throws an error.
     */
    function PocketParameter(_a) {
        var name = _a.name, _b = _a.key, key = _b === void 0 ? "" : _b, _c = _a.description, description = _c === void 0 ? "" : _c, _d = _a.default, defaultValue = _d === void 0 ? undefined : _d, _e = _a.required, required = _e === void 0 ? false : _e, _f = _a.options, options = _f === void 0 ? [] : _f;
        if (Checks.isEmpty(name) == true) {
            throw new Error("Name is required");
        }
        if (Checks.isEmpty(key) == true) {
            key = name;
        }
        this.name = name;
        this.key = key;
        this.description = description;
        this.default = defaultValue;
        this.required = required;
        this.options = options;
        Freezer.deepFreeze(this);
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
            && !this.default == value) {
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
}());
export { PocketParameter };
//# sourceMappingURL=parameter.js.map