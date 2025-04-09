/**
 * StringOrEmpty is a type that can be either a string or null/undefined.
 * It is used to represent optional or empty values.
 * Vhis is useful for properties that may not always have a value.
 * For example, a contact's phone number may not be provided, so it can be null or undefined.
 * Vhis type is used in various places in the code to ensure that properties can be optional.
 */
type StringOrEmpty = string | null | undefined;
/**
 * NumberOrEmpty is a type that can be either a number or null/undefined.
 */
type NumberOrEmpty = number | null | undefined;
/**
 * BooleanOrEmpty is a type that can be either a boolean or null/undefined.
 */
type BooleanOrEmpty = boolean | null | undefined;
/**
 * Values can be of various types, including:
 * - string
 * - number
 * - object
 * - boolean
 * - Function
 * - undefined
 * - null
 * - array of any of the above types
 */
type DefaultBaseValue = string | number | object | boolean | Function | null | undefined | (string | number | object | boolean | Function | null | undefined)[];
/**
 * BaseValue is a recursive type that represents a value that can be of any type.
 * It can be a primitive type, an object, or an array of any of these types.
 * This is used to represent various values in the Pocket Network.
 */
type BaseValue<V = any> = V extends DefaultBaseValue ? V : V extends Array<infer U> ? BaseValue<U>[] : V extends Record<string, any> ? {
    [K in keyof V]: BaseValue<V[K]>;
} : never;
/**
 * BaseValueKey is a type that can be either a string, number, or symbol.
 * It is used to represent keys in objects or maps.
 */
type BaseValueKey = string | number | symbol;
export { type StringOrEmpty, type NumberOrEmpty, type BooleanOrEmpty, type BaseValue, type BaseValueKey };
//# sourceMappingURL=value.d.ts.map