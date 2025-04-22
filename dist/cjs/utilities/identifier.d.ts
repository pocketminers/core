import { BaseIdentifierFormat } from "../templates/v0/index.js";
/**
 * PocketIdentity is a generic class that represents an identity object.
 */
declare class IdentifierUtilities {
    static create<I extends BaseIdentifierFormat>({ format, options }?: {
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
    static generateUUIDv4(): string;
    static generateRandomString(length?: number): string;
    static generateISOTimestamp(timestamp?: number): string;
    static formatIdentifier(identifier: string): string;
    static checkForUUID(identifier: string): boolean;
}
export { IdentifierUtilities };
//# sourceMappingURL=identifier.d.ts.map