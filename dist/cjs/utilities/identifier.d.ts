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
            timestamp?: number;
            seriesStart?: number;
            seriesEnd?: number;
            seriesStep?: number;
        };
    }): {
        id: string;
        format: I;
    };
    private static checkIdentityType;
    private static generateUUIDv4;
    private static generateRandomString;
    private static generateISOTimestamp;
    private static formatIdentifier;
    private static checkForUUID;
}
export { IdentifierUtilities };
//# sourceMappingURL=identifier.d.ts.map