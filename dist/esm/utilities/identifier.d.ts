import { BaseIdentifierFormat, BaseIdentifierFormats } from "../templates/v0/index.js";
/**
 * PocketIdentity is a generic class that represents an identity object.
 */
declare class IdentifierUtilities {
    /**
     * Creates a new identifier based on the provided format and options.
     * - The identifier is immutable after creation.
     *
     * @template I - The type of the identifier. It is one of the BaseIdentifierFormat types.
     *
     * @example
     * const identifier = IdentifierUtilities.create({
     *    format: "Name",
     *    options: {
     *      prefix: "prefix-",
     *      suffix: "-suffix",
     *      length: 10
     *    }
     * });
     * console.log(identifier.value); // "prefix-abcdefghij-suffix"
     *
     * @example
     * const identifier = IdentifierUtilities.create({
     *   format: "UUID"
     * });
     * console.log(identifier.value); // "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
     */
    static create<I extends BaseIdentifierFormat = BaseIdentifierFormats.UUID>({ format, options }?: {
        format?: I;
        options?: {
            prefix?: string;
            suffix?: string;
            length?: number;
            seriesStart?: number;
            seriesEnd?: number;
            seriesStep?: number;
        };
    }): {
        value: string;
        format: I;
    };
    static checkIdentityFormat(format: BaseIdentifierFormat, value: string): void;
    static checkUUIDv4Format(value: string): boolean;
    static generateUUIDv4(): string;
    static checkRandomStringFormat(value: string, length?: number): boolean;
    static generateRandomString(length?: number): string;
    static checkRandomNumberFormat(value: number, length?: number): boolean;
    static generateRandomNumber(length?: number): number;
}
export { IdentifierUtilities };
//# sourceMappingURL=identifier.d.ts.map