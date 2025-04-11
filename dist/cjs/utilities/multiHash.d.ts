import { BaseIdentifier, BaseIdentifierTypes } from "../templates/v0/base/identifier.js";
declare class MultiHashUtilities {
    static hashString(input: string): Promise<string>;
    /**
     * Generates a multihash from a given string input.
     * The multihash is a hash of the input string, encoded in hexadecimal format.
     */
    static generateMultihash(input: string): Promise<string>;
    /**
     * Generates a multihash from a given string input and returns it as a Identifier.
     */
    static generateIdentifier(input: string): Promise<BaseIdentifier<BaseIdentifierTypes.Multihash>>;
}
export { MultiHashUtilities };
//# sourceMappingURL=multiHash.d.ts.map