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
class PocketParameter {
    /**
     * The name of the parameter.
     * - It is a required field and cannot be empty.
     * - A corresponding Argument will be created with the same name.
     */
    name;
    /**
     * The description of the parameter.
     * - It is an optional field and can be empty which is the default, expressed as an empty string.
     * - It is used to provide additional information about the parameter.
     */
    description;
    /**
     * The default value of the parameter.
     * - It is an optional field and can be empty which is the default, expressed as undefined.
     * - It is used to provide a default value for the parameter if no value is provided.
     */
    default;
    /**
     * The required flag of the parameter.
     * - It is a boolean field that indicates whether the parameter is required or not.
     * - If true, the parameter must be provided.
     */
    required;
    /**
     * The options list of the parameter.
     * - It is an optional field and can be empty which is the default, expressed as an empty array.
     * - It is used to provide a list of valid options for the parameter.
     */
    options;
    /**
     * The constructor initializes the name, description, default value, required flag, and options list.
     * - If the name is empty, it throws an error.
     */
    constructor({ name, description = "", default: defaultValue = undefined, required = false, options = [] }) {
        if (Checks.isEmpty(name) == true) {
            throw new Error("Name is required");
        }
        this.name = name;
        this.description = description;
        this.default = defaultValue;
        this.required = required;
        this.options = options;
        Freezer.deepFreeze(this);
    }
    /**
     * Returns the name of the parameter as a string.
     *
     * @returns {string} - The name of the parameter.
     */
    get nameString() {
        return String(this.name);
    }
    /**
     * Checks if the provided value is valid according to the parameter's rules.
     * - If the value is required and empty, it throws an error.
     * - If the value is not in the options list and not equal to the default value, it throws an error.
     *
     * @param {BaseValue<T> | undefined} value - The value to check.
     * @returns {boolean} - Returns true if the value is valid, otherwise throws an error.
     */
    checkValue(value) {
        if (this.required == true
            && Checks.isEmpty(value) == true) {
            throw new Error(`Parameter ${this.nameString} is required`);
        }
        if (this.options.length > 0
            && Checks.isEmpty(value) == false
            && Checks.isEmpty(this.options) == false
            && Checks.isEmpty(this.options.find((option) => option == value)) == true
            && !this.options.includes(value)
            && !this.default == value) {
            throw new Error(`Parameter ${this.nameString} must be one of ${this.options.join(", ")} or ${this.default}, but got ${value}`);
        }
        return true;
    }
    /**
     * Returns the value if it is not empty, otherwise returns the default value.
     *
     * @param {BaseValue<T> | undefined} value - The value to check.
     * @returns {BaseValue<T> | undefined} - The value or the default value if the value is empty.
     */
    getValueOrDefault(value) {
        if (Checks.isEmpty(value) == true
            && this.checkValue(value) == false
            && Checks.isEmpty(this.default) == false) {
            return this.default;
        }
        return value;
    }
    /**
     * Returns the value if it is not empty, otherwise returns the default value or the first option.
     *
     * @param {BaseValue<T> | undefined} value - The value to check.
     * @returns {BaseValue<T> | undefined} - The value, default value, or first option if the value is empty.
     */
    getValueOrDefaultOrOptions(value) {
        let result = value;
        result = this.getValueOrDefault(value);
        if (Checks.isEmpty(result) == true
            && Checks.isEmpty(this.options) == false) {
            result = this.options[0];
        }
        return result;
    }
}
export { PocketParameter };
//# sourceMappingURL=parameter.js.map