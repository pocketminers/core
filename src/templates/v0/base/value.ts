/**
 * StringOrEmpty is a type that can be either a string or null/undefined.
 * It is used to represent optional or empty values.
 * This is useful for properties that may not always have a value.
 * For example, a contact's phone number may not be provided, so it can be null or undefined.
 * This type is used in various places in the code to ensure that properties can be optional.
 */
type StringOrEmpty = string | null | undefined;

type NumberOrEmpty = number | null | undefined;

type BooleanOrEmpty = boolean | null | undefined;


/**
 * Values can be of various types, including:
 * - string
 * - number
 * - object
 * - boolean
 * - null
 * - array of any of the above types
 */
type BaseValue = string | number | object | boolean | null | undefined | (string | number | object | boolean | null | undefined)[];


export {
    type StringOrEmpty,
    type NumberOrEmpty,
    type BooleanOrEmpty,
    type BaseValue
}
