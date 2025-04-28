import { BaseParameter, BaseValue, BaseValueKey } from "../templates/v0/index.js";
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
declare class PocketParameter<T = any> implements BaseParameter<T> {
    /**
     * The name of the parameter.
     * - It is a required field and cannot be empty.
     * - A corresponding Argument will be created with the same name.
     */
    readonly name: BaseValueKey;
    /**
     * The key of the parameter, if different from the name.
     * - It is an optional field and can be empty which is the default, expressed as an empty string.
     * - It is used to provide a different key for the parameter.
     */
    readonly key: BaseValueKey;
    /**
     * The description of the parameter.
     * - It is an optional field and can be empty which is the default, expressed as an empty string.
     * - It is used to provide additional information about the parameter.
     */
    readonly description: string;
    /**
     * The default value of the parameter.
     * - It is an optional field and can be empty which is the default, expressed as undefined.
     * - It is used to provide a default value for the parameter if no value is provided.
     */
    readonly default: BaseValue<T> | undefined;
    /**
     * The required flag of the parameter.
     * - It is a boolean field that indicates whether the parameter is required or not.
     * - If true, the parameter must be provided.
     */
    readonly required: boolean;
    /**
     * The options list of the parameter.
     * - It is an optional field and can be empty which is the default, expressed as an empty array.
     * - It is used to provide a list of valid options for the parameter.
     */
    readonly options: BaseValue<T>[];
    /**
     * The constructor initializes the name, description, default value, required flag, and options list.
     * - If the name is empty, it throws an error.
     */
    constructor({ name, key, description, default: defaultValue, required, options }: {
        name: BaseValueKey;
        key?: BaseValueKey;
        description?: string;
        default?: BaseValue<T>;
        required?: boolean;
        options?: BaseValue<T>[];
    });
    /**
     * Returns the name of the parameter as a string.
     *
     * @returns {string} - The name of the parameter.
     */
    get nameString(): string;
    /**
     * Returns the key of the parameter as a string.
     *
     * @returns {string} - The key of the parameter.
     */
    get keyString(): string;
    /**
     * Checks if the provided value is valid according to the parameter's rules.
     * - If the value is required and empty, it throws an error.
     * - If the value is not in the options list and not equal to the default value, it throws an error.
     *
     * @param {BaseValue<T> | undefined} value - The value to check.
     * @returns {boolean} - Returns true if the value is valid, otherwise throws an error.
     */
    checkValue(value: BaseValue<T> | undefined): boolean;
    /**
     * Returns the value if it is not empty, otherwise returns the default value.
     *
     * @param {BaseValue<T> | undefined} value - The value to check.
     * @returns {BaseValue<T> | undefined} - The value or the default value if the value is empty.
     */
    getValueOrDefault(value: BaseValue<T> | undefined): BaseValue<T> | undefined;
    /**
     * Returns the value if it is not empty, otherwise returns the default value or the first option.
     *
     * @param {BaseValue<T> | undefined} value - The value to check.
     * @returns {BaseValue<T> | undefined} - The value, default value, or first option if the value is empty.
     */
    getValueOrDefaultOrOptions(value: BaseValue<T> | undefined): BaseValue<T> | undefined;
}
export { PocketParameter };
//# sourceMappingURL=parameter.d.ts.map