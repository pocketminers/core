import { BaseIdentifier, BaseIdentifierFormat } from "../../templates/v0/index.js";
/**
 * IdentityEntry is a generic type that represents an identity entry object.
 * It extends the BaseIdentifier interface and includes a meta property.
 *
 * @template I - The type of the identifier associated with the identity.
 *
 * @extends BaseIdentifier
 *
 * @example
 * const identityEntry: IdentityEntry<string> = {
 *    format: "exampleType",
 *   value: "exampleValue"
 * };
 */
interface IdentityEntry<I extends BaseIdentifierFormat> extends BaseIdentifier<I> {
}
/**
 * PocketIdentity is a generic class that represents an identity object.
 */
declare class PocketIdentity<I extends BaseIdentifierFormat> implements BaseIdentifier<I> {
    readonly format: I;
    readonly value: string;
    constructor({ format, value }: {
        format: I;
        value: string;
    });
    private static checkIdentityType;
    private static generateUUIDv4;
    private static generateRandomString;
    private static generateISOTimestamp;
    private static formatIdentifier;
    private static checkForUUID;
}
export { type IdentityEntry, PocketIdentity };
//# sourceMappingURL=identity.d.ts.map